//imports 
importScripts('js/sw-utils.js');

const static_cache ='static_v2';
const dinamic_cache ='dinamic_v1';
const inmutable_cache ='inmutable_v1';
const dinamic_limit =50;
const App_shell=[
   // '/',
    '/index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js'
];
const App_sell_inmutable=[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install',e=>{
    const cachestatic = caches.open(static_cache).then(cache=>cache.addAll(App_shell));
    const cacheinmutable = caches.open(inmutable_cache).then(cache=>cache.addAll(App_sell_inmutable));
    e.waitUntil(Promise.all([cachestatic,cacheinmutable]));
});

self.addEventListener('activate',e=>{
    const respuesta = caches.keys().then(keys=>{
        keys.forEach(key =>{
            if (key !== static_cache && key.includes('static')) {
                return caches.delete(key);
            }
        })
    })
    e.waitUntil(respuesta);
});

self.addEventListener('fetch',e=>{
    const respuesta = caches.match(e.request).then(res=>{
        if(res){
            return res;
        }else{
            return fetch(e.request).then(newres=>{
                return actualizacachedinamico(dinamic_cache,e.request,newres);
            })
        }
    })
    e.respondWith(respuesta);
})
