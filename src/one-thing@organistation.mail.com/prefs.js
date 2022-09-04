const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const GdkPixbuf = imports.gi.GdkPixbuf;
const Gdk = imports.gi.Gdk;

const ExtensionUtils = imports.misc.extensionUtils;

function init() {
}

function buildPrefsWidget() {
    let widget = new PrefsWidget();
    return widget.widget;
}

class PrefsWidget {
    constructor() {
        this._settings = ExtensionUtils.getSettings();

        this.widget = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            margin_top: 10,
            margin_bottom: 10,
            margin_start: 10,
            margin_end: 10,
        });

        this.vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            margin_top: 0,
            hexpand: true,
        });
        this.vbox.set_size_request(60, 60);
        this.vbox.append(this.addTextUrl());
        this.widget.append(this.vbox);
    }

    addTextUrl() {
        let hbox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, margin_top: 5 });
        this.entry = new Gtk.Entry({ hexpand: true, margin_start: 20 });
        this.entry.set_placeholder_text("type your 'One Thing' here.")

        this.entry.set_text(this._settings.get_string('text'));
        this.entry.connect('changed', (entry) => {
            this._settings.set_string('text', entry.get_text());
        });

        hbox.append(this.entry);

        return hbox;
    }
}
