module.exports = PopupView;

function PopupView(view, eventbus) {

  view.attached = false;

  view.visible = false;

  view.show = function() {
    view.setVisible(true);
  };

  view.hide = function() {
    view.setVisible(false);
  };

  view.toggle = function(visible) {
    view.setVisible(typeof visible !== undefined && visible || !view.visible);
  };

  view.appendTo = function(parent) {
    view.view.appendTo(parent);
  };

  view.setVisible = function(visible) {
    if (!view.attached) {
      eventbus.attachView(view);
      view.attached = true;
    }
    view.visible = visible;

    eventbus.viewChanged(view);
  };

  eventbus.onToggleView(view._name, function(visible){
    view.toggle(visible);
  });    

  return view;
}