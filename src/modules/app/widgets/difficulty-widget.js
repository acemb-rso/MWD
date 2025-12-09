import { GMWidget } from "../gm-widget.js";
import { ANARCHY } from "../../config.js";
import { SYSTEM_NAME } from "../../constants.js";
import { formatString } from "../../strings.js";

const GM_DIFFICULTY_POOLS = "gm-difficulty-pools";

/**
 * Difficulty Widget
 * Provides quick-roll buttons for difficulty checks
 * 
 * Features:
 * - Configurable difficulty:pool pairs
 * - Rolls to chat with success count
 * - Stored as world setting
 */
export class DifficultyWidget extends GMWidget {

  constructor(gmManager) {
    super(gmManager);
    
    // Register settings
    this._registerSettings();
    
    // Load difficulty pools
    this.loadDifficultySettings();
    
    // Listen for setting updates
    Hooks.on('updateSetting', (setting, update, options, id) => {
      this.onUpdateSetting(setting, update, options, id);
    });
  }

  /**
   * Register game settings
   */
  _registerSettings() {
    game.settings.register(SYSTEM_NAME, GM_DIFFICULTY_POOLS, {
      scope: "world",
      name: ANARCHY.settings.gmDifficulty.name,
      hint: ANARCHY.settings.gmDifficulty.hint,
      config: true,
      default: ANARCHY.settings.gmDifficulty.default,
      type: String
    });
  }

  getTitle() {
    return "Difficulty Pools";
  }

  /**
   * Load difficulty settings from game settings
   */
  loadDifficultySettings() {
    const setting = game.settings.get(SYSTEM_NAME, GM_DIFFICULTY_POOLS);
    this.difficultyPools = setting.split(',').map(it => {
      const kv = it.trim().split(':');
      if (kv[1]) {
        return { 
          difficulty: kv[0].trim(), 
          pool: parseInt(kv[1].trim()) 
        };
      }
      return { 
        difficulty: kv[0].trim(),
        pool: parseInt(kv[0].trim()) 
      };
    }).filter(d => !isNaN(d.pool)); // Filter out invalid entries
  }

  /**
   * Get difficulty data for template
   */
  getDifficultyData() {
    return this.difficultyPools;
  }

  /**
   * Render difficulty buttons
   */
  async renderContent() {
    return await renderTemplate("systems/mwd/templates/app/gm-difficulty-buttons.hbs", {
      difficultyPools: this.difficultyPools
    });
  }

  /**
   * Activate listeners for difficulty buttons
   */
  activateListeners(html) {
    const container = html.querySelector('.gm-difficulty-bar');
    if (!container) return;
    
    // Use event delegation for difficulty button clicks
    container.addEventListener('click', async (event) => {
      const button = event.target.closest('a.click-roll-difficulty-pool');
      if (button) {
        event.preventDefault();
        await this._onClickDifficulty(button);
      }
    });
  }

  /**
   * Handle difficulty button click
   */
  async _onClickDifficulty(button) {
    const pool = parseInt(button.dataset.pool);
    const difficulty = button.dataset.difficulty || pool.toString();
    
    if (isNaN(pool) || pool < 1) return;
    
    // Roll the dice
    const roll = new Roll(`${pool}d6cs>=5`);
    await roll.evaluate();
    
    // Format the chat message
    const flavor = formatString(ANARCHY.settings.gmDifficulty.chatMessage, {
      pool: pool,
      difficulty: difficulty,
      success: roll.total
    });
    
    // Send to chat
    await roll.toMessage({ flavor: flavor });
  }

  /**
   * Handle setting updates
   */
  async onUpdateSetting(setting, update, options, id) {
    if (!game.user.isGM) return;
    if (setting.key !== `${SYSTEM_NAME}.${GM_DIFFICULTY_POOLS}`) return;
    
    this.loadDifficultySettings();
    await this.refresh();
  }
}
