import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  arr1 = [
    'http://pic.vjshi.com/2017-05-19/1175b476b9ffad11a3f5ff043289185b/00002.jpg?x-oss-process=style/watermark',
    'http://attachments.gfan.net.cn/forum/201806/02/150827jqzbh5rjxh2q5tvj.jpg',
    'http://t.qianlong.com/data/attachment/forum/201410/03/165837iflyv2obob00b2b0.jpg',
    'http://pic.vjshi.com/2016-08-13/5fcf97554572faa8b05a4bea600ca8d0/00001.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2017-06-02/ee7a3b528af8b96d6fb6d3f8b8a542e7/00002.jpg?x-oss-process=style/watermark',
    'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
    'http://pic.vjshi.com/2017-06-28/98c570be0c152a14e53e4546ed761dfe/00004.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2018-04-16/2e7e6fa1ab7f511ad58cc5874a96019c/00001.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2017-06-22/93edd7a15b49c1e14365670a04acf025/00004.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2017-04-09/b0798a0518ff26ba62b4798e9d19f3bd/00001.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2017-11-26/c7d55feb941d6952c12458d62c0c4ae1/00001.jpg?x-oss-process=style/watermark',
    'http://www.pptbz.com/pptpic/UploadFiles_6909/201406/2014063021281300.gif',
    'http://pic.vjshi.com/2017-12-13/242e96828d06f10b78bed08b81ea5bee/00004.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2017-07-05/6e4092479107296eb0c813ae4ecdd902/00002.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2017-09-02/7ea08afbf212386d028c1f8e635fab01/00001.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2017-03-09/971ba628f962bdd27b15b59bdcf50cb5/00003.jpg?x-oss-process=style/watermark',
    'http://img1.imgtn.bdimg.com/it/u=3921059015,1323318258&fm=26&gp=0.jpg',
    'http://img4.duitang.com/uploads/item/201210/06/20121006120433_CZXuC.jpeg',
    'http://pic.vjshi.com/2017-06-28/98c570be0c152a14e53e4546ed761dfe/00003.jpg?x-oss-process=style/watermark',
    'http://pic1.win4000.com/wallpaper/4/5875f71244fb1.jpg?down',
    'http://pic.vjshi.com/2017-08-29/c7b675ad7701682284537983473641de/00002.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2016-07-18/614117a1d58db452e249f9ecaf32d4dd/00001.jpg?x-oss-process=style/watermark',
    'http://pic.vjshi.com/2016-07-11/18145e1ee17c534d564fad11bef830bb/00001.jpg?x-oss-process=style/watermark',
    'http://t9.baidu.com/it/u=2955153989,3173743927&fm=191&app=48&wm=1,17,90,45,20,7&wmo=0,0&n=0&g=0n&f=JPEG?sec=1853310920&t=5f53fbbacf7cbe036d4f59d2e6cb7830',
    'http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png'
  ]
  constructor(
    public rd: Renderer2,
    public elem: ElementRef) {}
  kk1() { // 使用 Promis.all() 并发
    let wap = this.elem.nativeElement.querySelector('#wap');
    let arr2 = [];
    let inter = 0;
    let promis_all = () => {
      let now = this.arr1.slice(inter, inter + this.num);
      for (let i = this.num; i--;) {
        arr2[i] = new Promise(resolve => {
          let img = new Image();
          img.style.width = '90px';
          img.style.marginRight = '5px';
          img.src = now[i]
          img.onload = () => {
            resolve(img)
          }
        })
      }
      // arr2 是一个promise对象组成的数组
      Promise.all(arr2).then((item) => { // item是一个由 img 对象组成的数组
        let isDiv = this.rd.createElement('div');
        this.rd.appendChild(wap, isDiv)
        item.forEach(val => { // 遍历 item 数组，将 img 对象插入 DOM 树
          this.rd.appendChild(isDiv, val)
        })
      }).then(_ => { // 使用 then 保证上边的执行完才执行下边的
        inter += this.num;
        let isTrue = inter < this.arr1.length;
        if (isTrue) {
          setTimeout(promis_all, 1000)
        }
      })
    }
    promis_all()
  }
  ddd = null
  kk2() {
    let wap = this.elem.nativeElement.querySelector('#wap');

    let loadImg = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.style.width = '100px'
        img.style.marginRight = '3px'
        img.onload = function () {
          setTimeout(_ => resolve(img), 1000)
        }
        img.onerror = reject
        img.src = url
      })
    }
    let kk = Promise.resolve();
    for (let i = 0; i < this.arr1.length; i++) {
      kk = kk.then(() => loadImg(this.arr1[i]))
        .then(val => {
          this.rd.appendChild(wap, val)
        })
    }
  }
  kk3() {
    var prom
    for (let i = 5; i--;) {
      prom = Promise.resolve(prom)
        // promise1 = promise1
        .then(() => {
          return new Promise(resolve => setTimeout(_ => resolve(88), 1000))
        })
        .then((val) => {
          console.log(val)
        })
    }
  }
  kk4() {
    var prom
    for (let i = 5; i--;) {
      prom = Promise.resolve(prom)
        // promise1 = promise1
        .then(() => {
          return new Promise(resolve => setTimeout(_ => resolve(88), 1000))
        })
        .then((val) => {
          console.log(val)
        })
    }
  }
  kk5() {
    let wap = this.elem.nativeElement.querySelector('#wap');

    let loadImg = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.style.width = '100px'
        img.style.marginRight = '3px'
        img.onload = function () {
          setTimeout(_ => resolve(img), 1000)
        }
        img.onerror = reject
        img.src = url
      })
    }
    this.arr1.reduce((total, now) => {
      return total.then(() => loadImg(now))
        .then(val => {
          this.rd.appendChild(wap, val)
        })
    }, Promise.resolve())
  }
  kk6() { // 使用 Promis.all() 并发
    let wap = this.elem.nativeElement.querySelector('#wap');
    let arr2 = [];
    let inter = 0;
    let promis_all = () => {
      let now = this.arr1.slice(inter, inter + this.num);
      for (let i = this.num; i--;) {
        let obj;
        if (i === 4) {
          arr2[i] = new Promise(reject => {
            obj = {
              state: false,
              data: '出错了'
            }
            reject(obj)
          })
        } else {
          arr2[i] = new Promise(resolve => {
            let img = new Image();
            img.style.width = '90px';
            img.style.marginRight = '5px';
            img.src = now[i]
            img.onload = () => {
              obj = {
                state: true,
                data: img
              }
              resolve(obj)
            }
          })
        }
      }

      // arr2 是一个promise对象组成的数组
      Promise.all(arr2).then((item) => { // item是一个由 img 对象组成的数组

        let isDiv = this.rd.createElement('div');
        this.rd.appendChild(wap, isDiv)
        item.forEach(val => { // 遍历 item 数组，将 img 对象插入 DOM 树
          console.log(val)
          if (val['state']) {
            this.rd.appendChild(isDiv, val['data'])
          } else {
            // 如果某一个Promise 是 reject(),则在这里进行处理，但不会影响
            return Promise.reject(val)
              .catch(err => {
                console.log(err)
              })
          }
        })

      }).then(_ => { // 使用 then 保证上边的执行完才执行下边的
        inter += this.num;
        let isTrue = inter < this.arr1.length;
        if (isTrue) {
          setTimeout(promis_all, 1000)
        }
      }).catch(err => {
        console.error('Promise.all 当其中一个出现错误，就会reject。', err)
      })
    }
    promis_all()
  }
  kk7() {
    const promiseResove = function (n = 0) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({
            resolveAfterSeconds: n
          })
        }, n * 100);
      })
    }
    const promiseReject = function (n = 0) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          reject({
            rejectAfterSeconds: n
          })
        }, n * 100)
      })
    }
    var promiseArray2 = []
    promiseArray2.push(promiseResove(1))
    promiseArray2.push(promiseReject(3))
    promiseArray2.push(promiseResove(2))

    // 将传入promise.all的数组进行遍历，如果catch住reject结果，
    // 直接返回，这样就可以在最后结果中将所有结果都获取到
    var handlePromise2 = Promise.all(promiseArray2.map(function (promiseItem) {
      return promiseItem.catch(function (err) {
        return err
      })
    }))
    handlePromise2.then(function (values) {
      console.log('all promise are resolved', values)
    }).catch(function (reason) {
      console.log('promise reject failed reason', reason)
    })

  }

  kk8() { // 使用 Promis.all() 并发
    let wap = this.elem.nativeElement.querySelector('#wap');
    let arr2 = [];
    let inter = 0;
    let promis_all = () => {
      let now = this.arr1.slice(inter, inter + this.num);
      for (let i = this.num; i--;) {
        arr2[i] = new Promise((resolve, reject) => {
          if (i == 2) {
            throw (false)
          }
          let img = new Image();
          img.style.width = '90px';
          img.style.marginRight = '5px';
          img.src = now[i]
          img.onload = () => {
            resolve(img)
          }
        }).catch(e => {
          // 一定要添加错误处理，否则后边Promise.all() 无法正常遍历所有数据
          // 同时也对错误进行处理
          console.log(e)
          let img = new Image();
          img.style.width = '60px';
          img.style.marginRight = '5px';
          img.src = 'assets/4.png'
          img.onload = () => {
            arr2[i] = img
          }
          return img
        });
      }

      // arr2 是一个promise.then() 组成的数组，这样可以避免Promise.all()遇到reject后就停止向下继续执行
      Promise.all(arr2).then((item) => { // item是一个由 img 对象组成的数组
          let isDiv = this.rd.createElement('div');
          this.rd.appendChild(wap, isDiv)
          item.forEach(val => {
            // 遍历 item 数组，将 img 对象插入 DOM 树
            this.rd.appendChild(isDiv, val)
          })
        })
        .then(_ => { // 使用 then 保证上边的执行完才执行下边的
          inter += this.num;
          let isTrue = inter < this.arr1.length;
          if (isTrue) {
            setTimeout(promis_all, 1000)
          }
        })
    }
    promis_all()
  }
  kk9() {
    const p1 = new Promise((resolve, reject) => {
        resolve('hello');
      })
      .then(result => result)
      .catch(e => e);

    const p2 = new Promise((resolve, reject) => {
        throw new Error('报错了');
      })
      .then(result => result)
      .catch(e => e);

    Promise.all([p1, p2])
      .then(result => console.log(result))
  }
  num = 4;
  kk10() { // 先加载4张，然后再一张一张的添加，直到全加载完
    let wap = this.elem.nativeElement.querySelector('#wap'),
      start = true;
    // 生成 img 标签 Promise
    let makeImg = (now) => {
      return new Promise((resolve) => {
        let img = new Image();
        img.style.width = '90px';
        img.style.marginRight = '5px';
        img.src = now;
        img.onload = () => {
          if (start) {
            resolve(img)
          } else {
            setTimeout(_ => resolve(img), 1000)
          }
        }
      })
    }
    let promis_all = () => {
      let now = this.arr1.slice(0, this.num),
        arr2 = [];
      for (let i = this.num; i--;) {
        arr2[i] = makeImg(now[i]);
      }
      return arr2
    }

    let inside = (item) => {
      item.forEach(val => {
        // 遍历 item 数组，将 img 对象插入 DOM 树
        this.rd.appendChild(wap, val)
      })
    }

    // arr2 是一个promise.then() 组成的数组，这样可以避免Promise.all()遇到reject后就停止向下继续执行
    Promise.all(promis_all()).then((item) => { // item是一个由 img 对象组成的数组
        inside(item)
      })
      .then(_ => { // 使用 then 保证上边的执行完才执行下边的
        let arr = this.arr1.slice(this.num, this.arr1.length);
        start = false;
        arr.reduce((total, now) => {
          return total.then(() => makeImg(now))
            .then(val => {
              this.rd.appendChild(wap, val)
            })
        }, Promise.resolve())
      })

  }

  kk11() { // 先加载4张，然后再一张一张的添加，直到全加载完
    let wap = this.elem.nativeElement.querySelector('#wap'),
      start = true;
    // 生成 img 标签 Promise
    let makeImg = (now) => {
      return new Promise((resolve) => {
        let img = new Image();
        img.style.width = '90px';
        img.style.marginRight = '5px';
        img.src = now;
        img.onload = () => {
          setTimeout(_ => resolve(img), 500)
        }
      })
    }
    let arr2 = [];
    let now = this.arr1;
    for (let i = now.length; i--;) {
      arr2[i] = makeImg(now[i]);
    }

    let fun = (nowArr) => {
      Promise.race(nowArr).then((item) => { // item是一个由 img 对象组成的数组
        this.rd.appendChild(wap, item)
        return item
      }).then(arrs => {
        arr2 = [];
        now = now.filter(val => val !== arrs['src']);

        if (now.length) {
          for (let i = now.length; i--;) {
            arr2[i] = makeImg(now[i]);
          }
          fun(arr2)
        } else {
          let isDiv = this.rd.createElement('br');
          this.rd.appendChild(wap, isDiv)
        }
      })
    }

    fun(arr2)
  }

}
