'use strict';

const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

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
        this.vbox.append(this.addTextUrl());
        //this.vbox.append(this.addPicture());
        //this.vbox.append(this.addAuthors());
        this.widget.append(this.vbox);
    }

    addTextUrl() {
        let hbox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, margin_top: 5 });
        this.entry = new Gtk.Entry({ hexpand: true, margin_start: 20 });
        this.entry.set_placeholder_text("Type your 'One Thing' here …")
        this.entry.set_alignment(0.5);

        this.entry.set_text(this._settings.get_string('text'));
        this.entry.connect('changed', (entry) => {
            this._settings.set_string('text', entry.get_text());
        });
        this.entry.connect('activate', (entry) => {
            this._settings.set_string('text', entry.get_text());
        });

        hbox.append(this.entry);

        return hbox;
    }

    addPicture() {
        let picture = Gtk.Picture.new_for_filename(Me.dir.get_path() + "/assets/one-thing-gnome.svg");
        picture.set_size_request(10, 10);
        return picture;
    }

    addAuthors() {
        const label =new Gtk.Label({
	    use_markup: true,
	    label: '<span size="small">'
		+ ('Copyright © 2022 JAN and PRATAP (<a href="https://github.com/one-thing-gnome/one-thing">One Thing</a> on GitHub)')
		+ '</span>',
	    hexpand: true,
	    halign: Gtk.Align.CENTER,
        })
        return label;
	}
}
