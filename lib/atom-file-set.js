'use babel';

import AtomFileSetView from './atom-file-set-view';
import { CompositeDisposable } from 'atom';

export default {

  atomFileSetView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomFileSetView = new AtomFileSetView(state.atomFileSetViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomFileSetView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-file-set:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomFileSetView.destroy();
  },

  serialize() {
    return {
      atomFileSetViewState: this.atomFileSetView.serialize()
    };
  },

  toggle() {
    console.log('AtomFileSet was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
