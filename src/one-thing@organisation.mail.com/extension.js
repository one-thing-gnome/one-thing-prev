'use strict';

const { Clutter, GObject, Shell, St } = imports.gi;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const ExtensionUtils = imports.misc.extensionUtils;

let OneThing = GObject.registerClass(
    class OneThing extends PanelMenu.Button {
        _init() {
            super._init(0.0, 'One Thing');
            this._box = new St.BoxLayout();
            this._box.add_child(this._label = new St.Label({ text: "", y_align: Clutter.ActorAlign.CENTER }));
            this._box.add_child(this._icon = new St.Icon({ style_class: 'system-status-icon', icon_name: 'text-editor-symbolic' }));
            this.add_actor(this._box);
        }

        set label(labelText) {
            this._label.set_text(labelText);
        }

        vfunc_event(event) {
            if (event.type() == Clutter.EventType.BUTTON_RELEASE && event.get_button() == 1) {
                if(Main.sessionMode.currentMode !== 'unlock-dialog') ExtensionUtils.openPrefs();
            }
            return Clutter.EVENT_PROPAGATE;
        }

        vfunc_key_release_event(keyEvent) {
            let symbol = keyEvent.keyval;
            if (symbol == Clutter.KEY_Return || symbol == Clutter.KEY_space) {
                ExtensionUtils.openPrefs();
            }
            return Clutter.EVENT_PROPAGATE;
        }
    });

class Extension {
    constructor() {
    }

    _connectSettings() {
        this._settings.connect('changed::text', this._setText.bind(this));
    }

    _setText() {
        let text = this._settings.get_string('text');
        if (text !== '') {
            this._oneThingText.label = text;
            this._oneThingText._label.show();
            this._oneThingText._icon.hide();
        } else {
            this._oneThingText._label.hide();
            this._oneThingText._icon.show();
        };
    }

    enable() {
        this._settings = ExtensionUtils.getSettings();
        this._oneThingText = new OneThing();
        this._connectSettings();
        this._setText();
        Main.panel.addToStatusArea('onething-indicator', this._oneThingText);
    }

    disable() {
        this._oneThingText.destroy();
        this._oneThingText = null;
    }
}

function init() {
    return new Extension;
}
