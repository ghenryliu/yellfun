import {Indicator,Toast} from 'mint-ui';

export  function Toasts(val){
    Toast({
      message: val,
      position: 'middle',
      duration: 2000
    });
}
export function open(){
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
}

export function close(){
  Indicator.close()
}
