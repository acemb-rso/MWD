/**
 * Base class for all GM Manager widgets
 * Provides common functionality and lifecycle management
 * 
 * Widgets are modular components that can be:
 * - Enabled/disabled
 * - Collapsed/expanded
 * - Reordered
 * - Independently refreshed
 */
export class GMWidget {
  
  /**
   * @param {GMManager} gmManager - Reference to parent GM Manager
   */
  constructor(gmManager) {
    this.gmManager = gmManager;
    this.id = this.constructor.name.toLowerCase().replace('widget', '');
    this.enabled = true;
    this.collapsed = false;
  }

  /**
   * Get unique identifier for this widget
   * @returns {string}
   */
  getId() {
    return this.id;
  }

  /**
   * Get display title for this widget
   * @returns {string}
   */
  getTitle() {
    return "Widget";
  }

  /**
   * Get template path for rendering this widget
   * Override in subclass to use custom template
   * @returns {string}
   */
  getTemplatePath() {
    return `systems/mwd/templates/app/widgets/${this.id}.hbs`;
  }

  /**
   * Prepare data for template rendering
   * Override in subclass to provide widget-specific data
   * @returns {Promise<Object>}
   */
  async getTemplateData() {
    return {
      id: this.id,
      title: this.getTitle(),
      enabled: this.enabled,
      collapsed: this.collapsed,
      content: await this.renderContent()
    };
  }

  /**
   * Render the widget's content
   * Override in subclass to provide custom rendering
   * @returns {Promise<string>} Rendered HTML
   */
  async renderContent() {
    return "";
  }

  /**
   * Activate event listeners for this widget
   * Called after the GM Manager renders
   * @param {HTMLElement} html - The GM Manager's HTML element
   */
  activateListeners(html) {
    // Override in subclass
  }

  /**
   * Refresh this widget's display
   * Triggers a re-render of the entire GM Manager
   */
  async refresh() {
    await this.gmManager.refresh();
  }

  /**
   * Enable this widget
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable this widget
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Toggle widget enabled state
   */
  toggleEnabled() {
    this.enabled = !this.enabled;
  }

  /**
   * Collapse this widget
   */
  collapse() {
    this.collapsed = true;
  }

  /**
   * Expand this widget
   */
  expand() {
    this.collapsed = false;
  }

  /**
   * Toggle widget collapsed state
   */
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  /**
   * Query for an element within the widget's section
   * @param {HTMLElement} html - Root element to search from
   * @param {string} selector - CSS selector
   * @returns {HTMLElement|null}
   */
  querySelector(html, selector) {
    const widgetSection = html.querySelector(`[data-widget="${this.id}"]`);
    return widgetSection?.querySelector(selector);
  }

  /**
   * Query for all elements within the widget's section
   * @param {HTMLElement} html - Root element to search from
   * @param {string} selector - CSS selector
   * @returns {NodeList}
   */
  querySelectorAll(html, selector) {
    const widgetSection = html.querySelector(`[data-widget="${this.id}"]`);
    return widgetSection?.querySelectorAll(selector) ?? [];
  }
}
