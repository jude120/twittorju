function actualizacachedinamico(dinamiccache,request,res) {
    if (res.ok) {
        return caches.open(dinamiccache).then(cache=>{
            cache.put(request,res.clone());
            return res.clone;
        })
    }else{
        return res;
    }
}