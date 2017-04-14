/**
 * Created by kh.levon98 on 24-Sep-16.
 */

//import ace from "ace/ace";
//import "ace/ext/language_tools";
//import {UndoManager} from "ace/undomanager";

/**
 * Sets editor options such as the wrapping mode or the syntax checker.
 *
 * The supported options are:
 *
 *   <ul>
 *     <li>showGutter</li>
 *     <li>useWrapMode</li>
 *     <li>onLoad</li>
 *     <li>theme</li>
 *     <li>mode</li>
 *   </ul>
 *
 * @param acee
 * @param session ACE editor session
 * @param {object} opts Options to be set
 */
function setOptions(acee, session, opts) {
  // sets the ace worker path, if running from concatenated
  // or minified source
  if (angular.isDefined(opts.workerPath)) {
    let config = angular.ace.config;//ace.require('ace/config');
    config.set('workerPath', opts.workerPath);
  }
  // ace requires loading
  if (angular.isDefined(opts.require)) {
    opts.require.forEach(function (n) {
      angular.ace.require(n);
    });
  }

  // Boolean options
  if (angular.isDefined(opts.showGutter)) {
    acee.renderer.setShowGutter(opts.showGutter);
  }
  if (angular.isDefined(opts.useWrapMode)) {
    session.setUseWrapMode(opts.useWrapMode);
  }
  if (angular.isDefined(opts.showInvisibles)) {
    acee.renderer.setShowInvisibles(opts.showInvisibles);
  }
  if (angular.isDefined(opts.showIndentGuides)) {
    acee.renderer.setDisplayIndentGuides(opts.showIndentGuides);
  }
  if (angular.isDefined(opts.useSoftTabs)) {
    session.setUseSoftTabs(opts.useSoftTabs);
  }
  if (angular.isDefined(opts.showPrintMargin)) {
    acee.setShowPrintMargin(opts.showPrintMargin);
  }

  if (angular.isDefined(opts.commands) && angular.isArray(opts.commands)) {
    for (let i = 0, ln = opts.commands.length; i < ln; ++i) {
      if (angular.isObject(opts.commands[i])) {
        acee.commands.addCommand(opts.commands[i]);
      } else {
        console.warn("command must be an object");
      }
    }
  }

  // Basic options
  if (angular.isString(opts.theme)) {
    acee.setTheme('ace/theme/' + opts.theme);
  }

  if (angular.isString(opts.mode)) {
    session.setMode('ace/mode/' + opts.mode);
  }

  // advanced options
  let key, obj;
  if (angular.isDefined(opts.advanced)) {
    for (key in opts.advanced) {
      // create a javascript object with the key and value
      obj = {name: key, value: opts.advanced[key]};
      // try to assign the option to the ace editor
      acee.setOption(obj.name, obj.value);
    }
  }

  // advanced options for the renderer
  if (angular.isDefined(opts.rendererOptions)) {
    for (key in opts.rendererOptions) {
      // create a javascript object with the key and value
      obj = {name: key, value: opts.rendererOptions[key]};
      // try to assign the option to the ace editor
      acee.renderer.setOption(obj.name, obj.value);
    }
  }

  session.setUndoManager(new angular.ace.UndoManager());

  if (angular.isDefined(opts.cursorPosition)) {
    acee.moveCursorToPosition(opts.cursorPosition);
  }

  acee.$blockScrolling = Infinity;

  acee.focus();

  // onLoad callbacks
  angular.forEach(opts.callbacks, function (cb) {
    if (angular.isFunction(cb)) {
      cb(acee);
    }
  });

}


function AceLink(scope, elm, attrs, ngModel) {
  let options = {};

  let AceFactory = scope._AceFactory;

  let opts = angular.extend({}, options, scope.aceConfig);

  /**
   * ACE editor
   * @type object
   */
  AceFactory.editor = angular.ace.edit(elm[0]);

  AceFactory.editor.container.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    // alert('success!');
    return false;
  }, false);


  /**
   * ACE editor session.
   * @type object
   * @see [EditSession]{@link http://ace.c9.io/#nav=api&api=edit_session}
   */

  AceFactory.session = AceFactory.editor.getSession();

  /**
   * Reference to a change listener created by the listener factory.
   * @function
   * @see listenerFactory.onChange
   */
  let onChangeListener;

  /**
   * Reference to a blur listener created by the listener factory.
   * @function
   * @see listenerFactory.onBlur
   */
  let onBlurListener;

  /**
   * Calls a callback by checking its existing. The argument list
   * is variable and thus this function is relying on the arguments
   * object.
   * @throws {Error} If the callback isn't a function
   */
  let executeUserCallback = function () {

    /**
     * The callback function grabbed from the array-like arguments
     * object. The first argument should always be the callback.
     *
     * @see [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments}
     * @type {*}
     */
    let callback = arguments[0];

    /**
     * Arguments to be passed to the callback. These are taken
     * from the array-like arguments object. The first argument
     * is stripped because that should be the callback function.
     *
     * @see [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments}
     * @type {Array}
     */
    let args = Array.prototype.slice.call(arguments, 1);

    if (angular.isDefined(callback)) {
      scope.$evalAsync(function () {
        if (angular.isFunction(callback)) {
          callback(args);
        } else {
          throw new Error('ui-ace use a function as callback.');
        }
      });
    }
  };

  /**
   * Listener factory. Until now only change listeners can be created.
   * @type object
   */
  let listenerFactory = {
    /**
     * Creates a change listener which propagates the change event
     * and the editor session to the callback from the user option
     * onChange. It might be exchanged during runtime, if this
     * happens the old listener will be unbound.
     *
     * @param callback callback function defined in the user options
     * @see onChangeListener
     */
    onChange: function (callback) {
      return function (e) {
        let newValue = AceFactory.session.getValue();

        if (ngModel && newValue !== ngModel.$viewValue &&
          // HACK make sure to only trigger the apply outside of the
          // digest loop 'cause ACE is actually using this callback
          // for any text transformation !
          !scope.$$phase && !scope.$root.$$phase) {
          scope.$evalAsync(function () {
            ngModel.$setViewValue(newValue);
          });
        }

        executeUserCallback(callback, e, AceFactory.editor);
      };
    },
    /**
     * Creates a blur listener which propagates the editor session
     * to the callback from the user option onBlur. It might be
     * exchanged during runtime, if this happens the old listener
     * will be unbound.
     *
     * @param callback callback function defined in the user options
     * @see onBlurListener
     */
    onBlur: function (callback) {
      return function () {
        executeUserCallback(callback, AceFactory.editor);
      };
    }
  };

  attrs.$observe('readonly', function (value) {
    AceFactory.editor.setReadOnly(!!value || value === '');
  });

  // Value Blind
  if (ngModel) {
    ngModel.$formatters.push(function (value) {
      if (angular.isUndefined(value) || value === null) {
        return '';
      }
      else if (angular.isObject(value) || angular.isArray(value)) {
        throw new Error('ui-ace cannot use an object or an array as a model');
      }
      return value;
    });

    ngModel.$render = function () {
      AceFactory.session.setValue(ngModel.$viewValue);
    };
  }

  // Listen for option updates
  let updateOptions = function (current, previous) {
    if (current === previous) return;
    opts = angular.extend({}, options, scope.aceConfig);

    console.log("opts - ", opts.mode)

    opts.callbacks = [opts.onLoad];
    if (opts.onLoad !== options.onLoad) {
      // also call the global onLoad handler
      opts.callbacks.unshift(options.onLoad);
    }

    // EVENTS

    // unbind old change listener
    AceFactory.session.removeListener('change', onChangeListener);

    // bind new change listener
    onChangeListener = listenerFactory.onChange(opts.onChange);
    AceFactory.session.on('change', onChangeListener);

    // unbind old blur listener
    //session.removeListener('blur', onBlurListener);
    AceFactory.editor.removeListener('blur', onBlurListener);

    // bind new blur listener
    onBlurListener = listenerFactory.onBlur(opts.onBlur);
    AceFactory.editor.on('blur', onBlurListener);

    setOptions(AceFactory.editor, AceFactory.session, opts);
  };

  scope.$watch(() => scope.aceConfig, updateOptions, /* deep watch */ true);

  // set the options here, even if we try to watch later, if this
  // line is missing things go wrong (and the tests will also fail)
  updateOptions(options);

  elm.on('$destroy', function () {
    AceFactory.editor.session.$stopWorker();
    AceFactory.editor.destroy();
  });

  scope.$watch(function () {
    return [elm[0].offsetWidth, elm[0].offsetHeight];
  }, function () {
    AceFactory.editor.resize();
    AceFactory.editor.renderer.updateFull();
  }, true);

}


export default AceLink;