const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject ||[
    {logo:'A',url:'http://www.acfun.cn'},
    {logo:'B',url:'http://www.bilibili.com'},
    {logo:'Z',url:'http://www.zhihu.com'},
    {logo:'G',url:'http://www.github.com'},
    {logo:'i',url:'http://www.iconfont.cn'},
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}
const render = ()=>{
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
      console.log(index)
    const $li = $(`<li>
    
      <div class="site">
       <div class="logo">${node.logo}</div>
       <div class="link">${simplifyUrl(node.url)}</div>
       <div class="close">
         <svg class="icon" >
           <use xlink:href="#icon-close"></use>
         </svg>
       </div>
      </div>

    </li>`).insertBefore($lastLi) 
    $li.on('click',()=>{
        window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
        console.log('这里')
        e.stopPropagation()//阻止冒泡
        console.log(hashMap)
        hashMap.splice(index, 1)
        render()
    })
})
}
render()
$('.addButton')
.on('click',()=> {
   let url = window.prompt('请问呢要添加的网址是啥？')
   if(url.indexOf('http')!==0)
   {url = 'https://'+ url
}
   hashMap.push({
       logo:simplifyUrl(url)[0].toUpperCase(),
       url:url
   })
   render()
})

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
 const {key} = e
 for (let i =0;i<hashMap.length;i++){
   if(hashMap[i].logo.toLocaleLowerCase()===key)
   {window.open(hashMap[i].url)}
 }
 //添加个键盘快捷键
})


  
