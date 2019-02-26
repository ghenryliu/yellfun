import Vue from 'vue'
import updatemarkerview from './components/updatemarkerview.vue'

function UpdateMarkerView(deleteCallback, changePosCallback, shareCallBack) {

  var _vm = null

  var _deleteCallback = deleteCallback

  var _changePosCallback = changePosCallback

  var _shareCallBack = shareCallBack

  var _pos = null

  function load() {

    _vm = new Vue({
      el:'#updatemaker',
      components: { updatemarkerview },
      data: function() {
        return {
          show:true,
          x:_pos.x,
          y:_pos.y
        }
      },
      methods: {
        deleteMarker:function() {

          _deleteCallback && _deleteCallback()

          this.show = false
        },
        changeMarkerPos:function() {

          _changePosCallback && _changePosCallback()

          this.show = false
        },
        share:function() {

          _shareCallBack && _shareCallBack()

          this.show = false
        }
      }
    })
  }

  function getPos(marker, map) {

    var pos = map.getScreenPos(marker.position)

    var x = (pos.x - 65).toString() + 'px'

    var y = (pos.y - 100).toString() + 'px'

    return {x:x, y:y}
  }

  function show(visible, marker, map) {

    if (!_vm) {

      _pos = getPos(marker, map)

      if (visible) {

        load()
      }

      return
    }

    if (visible) {

      _pos = getPos(marker, map)

      _vm.show = true

      _vm.x = _pos.x

      _vm.y = _pos.y
    }
    else {

      _vm.show = false
    }
  }

  this.show = show
}

export { UpdateMarkerView as default }
