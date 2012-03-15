/**
 * Wrapper around the Chrome console for easier debugging
 *
 * Sample usage:
 *
 * var debug = sp.require('assets/scripts/debug').Console;
 * debug.active = true;         // Whether the Console should report
 * debug.name = 'my console';   // A name for the console
 * debug.log('Hello world');    // logs > my console ["Hello World!"]
 */
exports.Console = function() {
  /**
   * Prints to the console using a specified method
   * @this {Console}
   * @private
   */
  var _output = function() {
    if (this.active) {
      if (window.console && window.console[this.method] && window.console[this.method].apply) {
        window.console[this.method].apply(console, [this.name, arguments]);
      }
    }
  };
  /**
   * Starts a specific timer
   * @param {string} identifier The name of the timer.
   * @this {Console}
   * @private
   */
  var _timerStart = function(identifier) {
    if (this.active) {
      if (window.console && window.console.time) {
        window.console.time(identifier);
      }
    }
  };
  /**
   * Stops a specific timer
   * @param {string} identifier The name of the timer.
   * @this {Console}
   * @private
   */
  var _timerStop = function(identifier) {
    if (this.active) {
      if (window.console && window.console.timeEnd) {
        window.console.timeEnd(identifier);
      }
    }
  };
  /**
   * Return public functions
   */
  return {
    /**
     * The name (identifier) of the Console's current method
     * @type {string}
     */
    name: 'console',
    /**
     * The current method used by the Console
     * @type {string}
     */
    method: 'log',
    active: true,
    /**
     * The standard log function
     * @this {Console}
     */
    log: function() {
      this.method = 'log';
      _output.apply(this, arguments);
    },
    /**
     * Info style logging messages
     * @this {Console}
     */
    info: function() {
      this.method = 'info';
      _output.apply(this, arguments);
    },
    /**
     * Warn style logging messages
     * @this {Console}
     */
    warn: function() {
      this.method = 'warn';
      _output.apply(this, arguments);
    },
    /**
     * Error style logging messages
     * @this {Console}
     */
    error: function() {
      this.method = 'error';
      _output.apply(this, arguments);
    },
    /**
     * Public function to start a timer
     * @param {!string} identifier The name of the timer.
     * @this {Console}
     */
    startTimer: function(identifier) {
      if (!identifier) { return; }
      this.method = 'info';
      _timerStart.call(this, identifier);
      _output.apply(this, ['timer ' + identifier + ' started']);
    },
    /**
     * Public function to stop a timer
     * @param {!string} identifier The name of the timer.
     * @this {Console}
     */
    stopTimer: function(identifier) {
      if (!identifier) { return; }
      _timerStop.call(this, identifier);
    }
  };
}();
