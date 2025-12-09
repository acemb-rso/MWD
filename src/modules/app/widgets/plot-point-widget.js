import { GMWidget } from "../gm-widget.js";
import { ANARCHY } from "../../config.js";
import { SYSTEM_NAME } from "../../constants.js";
import { RemoteCall } from "../../remotecall.js";
import { ErrorManager } from "../../error-manager.js";
import { formatString } from "../../strings.js";

const GM_ANARCHY = "anarchy-gm";
const GM_SCENE_ANARCHY = "scene-anarchy-gm";
const GM_ADD_ANARCHY = 'GMAnarchy.addAnarchy';

/**
 * Plot Point Widget
 * Manages the GM's plot point pool
 * 
 * Features:
 * - Click to add/remove plot points
 * - Syncs with actor sheets
 * - Remote call support for player-to-GM transfers
 * - Chat notifications
 */
export class PlotPointWidget extends GMWidget {

  constructor(gmManager) {
    super(gmManager);
    
    // Register settings
    this._registerSettings();
    
    // Register remote call handler
    RemoteCall.register(GM_ADD_ANARCHY, {
      callback: data => this.addAnarchy(data),
      condition: user => user.isGM
    });
    
    // Load current value
    this.anarchy = game.settings.get(SYSTEM_NAME, GM_ANARCHY);
    
    // Listen for setting updates
    Hooks.on('updateSetting', (setting, update, options, id) => {
      this.onUpdateSetting(setting, update, options, id);
    });
  }

  /**
   * Register game settings
   */
  _registerSettings() {
    game.settings.register(SYSTEM_NAME, GM_ANARCHY, {
      scope: "world",
      config: false,
      default: 1,
      type: Number
    });
    
    game.settings.register(SYSTEM_NAME, GM_SCENE_ANARCHY, {
      scope: "world",
      config: false,
      default: 0,
      type: Number
    });
  }

  getTitle() {
    return ANARCHY.actor.counters.plot;
  }

  /**
   * Get current plot point data
   */
  getAnarchy() {
    return {
      isGM: true,
      value: this.anarchy,
      max: this.anarchy + 1,
      scene: 0
    };
  }

  /**
   * Render the plot point bar
   */
  async renderContent() {
    return await renderTemplate("systems/mwd/templates/monitors/anarchy.hbs", {
      code: 'plot',
      rowlength: 6,
      value: this.getAnarchy().value,
      max: this.getAnarchy().max,
      scene: 0,
      labelkey: ANARCHY.actor.counters.plot
    });
  }

  /**
   * Activate listeners for plot point clicks
   */
  activateListeners(html) {
    const container = html.querySelector('.gm-anarchy-bar');
    if (!container) return;
    
    // Use event delegation for checkbar clicks
    container.addEventListener('click', async (event) => {
      const checkbar = event.target.closest('a.click-checkbar-element');
      if (checkbar) {
        event.preventDefault();
        await this._onClickCheckbar(checkbar);
      }
    });
  }

  /**
   * Handle checkbar click
   */
  async _onClickCheckbar(element) {
    const index = parseInt(element.dataset.index);
    if (isNaN(index)) return;
    
    const newAnarchy = index < this.anarchy ? index : index + 1;
    await this.setAnarchy(newAnarchy);
  }

  /**
   * Actor gives plot points to GM
   */
  async actorGivesAnarchyToGM(actor, count) {
    if (count > 0) {
      ChatMessage.create({
        user: game.user,
        whisper: ChatMessage.getWhisperRecipients('GM'),
        content: formatString(ANARCHY.gmManager.gmReceivedAnarchy, {
          anarchy: count,
          actor: actor.name
        })
      });
      await this.addAnarchy(count);
    }
  }

  /**
   * NPC consumes plot points
   */
  async npcConsumesAnarchy(actor, count) {
    await this.addAnarchy(-count);
  }

  /**
   * Add plot points (can be negative to subtract)
   */
  async addAnarchy(count) {
    // Try remote call first (for non-GMs or multiple GM scenarios)
    if (!RemoteCall.call(GM_ADD_ANARCHY, count)) {
      // Local execution
      ErrorManager.checkSufficient(ANARCHY.actor.counters.plot, -count, this.anarchy);
      await this.setAnarchy(this.anarchy + count);
    }
  }

  /**
   * Set plot points to specific value
   */
  async setAnarchy(newAnarchy) {
    this.anarchy = Math.max(0, newAnarchy); // Don't allow negative
    await game.settings.set(SYSTEM_NAME, GM_ANARCHY, this.anarchy);
    await this.refresh();
    this._syncGMAnarchySheets();
  }

  /**
   * Sync actor sheets that display GM plot points
   */
  _syncGMAnarchySheets() {
    // Get linked actors
    const linkedActors = game.actors.filter(actor => 
      !actor.token || actor.token.isLinked
    );
    
    // Get unlinked token actors
    const unlinkedActors = (game.canvas?.tokens?.placeableObjects ?? [])
      .filter(t => !t.document.isLinked)
      .map(t => t.actor)
      .filter(a => a); // Filter out null actors
    
    // Render sheets for GM-owned actors
    linkedActors.concat(unlinkedActors)
      .filter(actor => !actor.hasPlayerOwner)
      .forEach(actor => {
        if (actor.sheet?.rendered) {
          actor.render(false);
        }
      });
  }

  /**
   * Handle setting updates
   */
  async onUpdateSetting(setting, update, options, id) {
    if (setting.key !== `${SYSTEM_NAME}.${GM_ANARCHY}`) return;
    
    this.anarchy = setting.value ?? game.settings.get(SYSTEM_NAME, GM_ANARCHY);
    await this.refresh();
  }
}
