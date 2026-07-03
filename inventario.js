/* Carvimax — inventario de demostración (determinístico) */
(function(){
  'use strict';
  var MODELOS=[
    {marca:'Toyota',modelo:'Hilux',cat:'Pickup',base:27000,n:7},
    {marca:'Toyota',modelo:'RAV4',cat:'SUV',base:26000,n:5,img:'car_rav4.webp'},
    {marca:'Toyota',modelo:'Corolla',cat:'Sedán',base:19000,n:6},
    {marca:'Toyota',modelo:'Yaris',cat:'Hatchback',base:13500,n:5},
    {marca:'Toyota',modelo:'Land Cruiser Prado',cat:'SUV',base:45000,n:3},
    {marca:'Toyota',modelo:'Tacoma',cat:'Pickup',base:31000,n:3},
    {marca:'Hyundai',modelo:'Tucson',cat:'SUV',base:24000,n:6,img:'car_tucson.webp'},
    {marca:'Hyundai',modelo:'Santa Fe',cat:'SUV',base:28000,n:4},
    {marca:'Hyundai',modelo:'Accent',cat:'Sedán',base:14000,n:5},
    {marca:'Hyundai',modelo:'Elantra',cat:'Sedán',base:17500,n:4},
    {marca:'Hyundai',modelo:'Grand i10',cat:'Hatchback',base:11500,n:4},
    {marca:'Kia',modelo:'Sportage',cat:'SUV',base:23000,n:5},
    {marca:'Kia',modelo:'Rio',cat:'Sedán',base:13500,n:5,img:'car_rio.webp'},
    {marca:'Kia',modelo:'Picanto',cat:'Hatchback',base:10500,n:4},
    {marca:'Kia',modelo:'Sorento',cat:'SUV',base:29000,n:3},
    {marca:'Nissan',modelo:'Frontier',cat:'Pickup',base:25500,n:5},
    {marca:'Nissan',modelo:'Sentra',cat:'Sedán',base:16500,n:4},
    {marca:'Nissan',modelo:'Kicks',cat:'SUV',base:19000,n:4},
    {marca:'Nissan',modelo:'X-Trail',cat:'SUV',base:24500,n:3},
    {marca:'Honda',modelo:'CR-V',cat:'SUV',base:26500,n:4},
    {marca:'Honda',modelo:'Civic',cat:'Sedán',base:21000,n:4},
    {marca:'Honda',modelo:'HR-V',cat:'SUV',base:21500,n:3},
    {marca:'Ford',modelo:'Ranger',cat:'Pickup',base:26500,n:5,img:'car_ranger.webp'},
    {marca:'Ford',modelo:'Escape',cat:'SUV',base:22000,n:3},
    {marca:'Ford',modelo:'Explorer',cat:'SUV',base:33000,n:2},
    {marca:'Chevrolet',modelo:'Tracker',cat:'SUV',base:19500,n:3},
    {marca:'Chevrolet',modelo:'Colorado',cat:'Pickup',base:27500,n:3},
    {marca:'Chevrolet',modelo:'Spark',cat:'Hatchback',base:9500,n:3},
    {marca:'Mazda',modelo:'CX-5',cat:'SUV',base:25000,n:4},
    {marca:'Mazda',modelo:'Mazda 3',cat:'Sedán',base:19500,n:3},
    {marca:'Mazda',modelo:'BT-50',cat:'Pickup',base:24500,n:2},
    {marca:'Mitsubishi',modelo:'L200',cat:'Pickup',base:24000,n:4},
    {marca:'Mitsubishi',modelo:'Outlander',cat:'SUV',base:22500,n:3},
    {marca:'Mitsubishi',modelo:'Mirage',cat:'Hatchback',base:10500,n:3},
    {marca:'Suzuki',modelo:'Vitara',cat:'SUV',base:18500,n:3},
    {marca:'Suzuki',modelo:'Swift',cat:'Hatchback',base:12000,n:4},
    {marca:'Suzuki',modelo:'Jimny',cat:'SUV',base:19500,n:2},
    {marca:'Volkswagen',modelo:'Amarok',cat:'Pickup',base:29500,n:2},
    {marca:'Volkswagen',modelo:'Tiguan',cat:'SUV',base:25500,n:2},
    {marca:'BMW',modelo:'Serie 3',cat:'Sedán',base:34000,n:2},
    {marca:'BMW',modelo:'420i Coupé',cat:'Coupé',base:42000,n:2},
    {marca:'Mercedes-Benz',modelo:'C 200',cat:'Sedán',base:36000,n:2},
    {marca:'Ford',modelo:'Mustang',cat:'Coupé',base:38000,n:2},
    {marca:'Yamaha',modelo:'MT-07',cat:'Moto',base:8200,n:3},
    {marca:'Yamaha',modelo:'FZ 250',cat:'Moto',base:3400,n:3},
    {marca:'Honda',modelo:'CB 500X',cat:'Moto',base:6800,n:3},
    {marca:'Honda',modelo:'Navi 110',cat:'Moto',base:1500,n:2},
    {marca:'Suzuki',modelo:'GN 125',cat:'Moto',base:1900,n:3},
    {marca:'Kawasaki',modelo:'Ninja 400',cat:'Moto',base:6500,n:2}
  ];
  var DEPTOS=['San Salvador','San Salvador','San Salvador','San Salvador','La Libertad','La Libertad','La Libertad','Santa Ana','Santa Ana','San Miguel','San Miguel','Sonsonate','La Paz','Usulután','Ahuachapán','San Vicente','Cuscatlán','La Unión','Chalatenango','Morazán','Cabañas'];
  var CAT_IMG={SUV:'cat_suv.webp',Pickup:'cat_pickup.webp','Sedán':'cat_sedan.webp',Hatchback:'cat_hatchback.webp','Coupé':'cat_coupe.webp',Moto:'cat_moto.webp'};

  function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; var t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

  var items=[],id=1,rand=rng(20260703);
  MODELOS.forEach(function(m){
    for(var i=0;i<m.n;i++){
      var nuevo = rand()<0.16;
      var year = nuevo ? (rand()<0.5?2025:2026) : 2013+Math.floor(rand()*12); /* 2013–2024 */
      var age = Math.max(0,2026-year);
      var km = nuevo ? 0 : Math.round((6000+rand()*14000)*age/500)*500;
      var dep = Math.pow(0.915,age) * (0.88+rand()*0.24);
      var precio = Math.round(m.base*dep/100)*100;
      if(precio<900) precio=900;
      var origen = nuevo ? 'agencia' : (rand()<0.68?'importado':'agencia');
      var comb;
      if(m.cat==='Moto') comb='Gasolina';
      else if(m.cat==='Pickup') comb=rand()<0.7?'Diésel':'Gasolina';
      else if(/RAV4|CR-V|Tucson|Sportage|Outlander|Kicks/.test(m.modelo)&&rand()<0.3) comb='Híbrido';
      else comb=rand()<0.92?'Gasolina':'Diésel';
      var trans = m.cat==='Moto' ? 'Mecánica' : (rand()<0.72?'Automática':'Mecánica');
      items.push({
        id:id++, marca:m.marca, modelo:m.modelo, cat:m.cat, year:year, km:km,
        precio:precio, depto:DEPTOS[Math.floor(rand()*DEPTOS.length)],
        origen:origen, tipo:nuevo?'nuevo':'usado',
        comb:comb, trans:trans,
        verificado:rand()<0.82, inspeccionado:rand()<0.45,
        img:m.img||CAT_IMG[m.cat]
      });
    }
  });
  window.INVENTARIO=items;

  window.invFiltrar=function(f){
    f=f||{};
    var q=(f.q||'').trim().toLowerCase();
    return items.filter(function(v){
      if(f.tipo&&f.tipo.length&&f.tipo.indexOf(v.tipo)<0) return false;
      if(f.origen&&f.origen.length&&f.origen.indexOf(v.origen)<0) return false;
      if(f.deptos&&f.deptos.length&&f.deptos.indexOf(v.depto)<0) return false;
      if(f.cats&&f.cats.length&&f.cats.indexOf(v.cat)<0) return false;
      if(f.marcas&&f.marcas.length&&f.marcas.indexOf(v.marca)<0) return false;
      if(f.comb&&f.comb.length&&f.comb.indexOf(v.comb)<0) return false;
      if(f.trans&&f.trans.length&&f.trans.indexOf(v.trans)<0) return false;
      if(f.min!=null&&v.precio<f.min) return false;
      if(f.max!=null&&v.precio>f.max) return false;
      if(f.yearMin!=null&&v.year<f.yearMin) return false;
      if(f.yearMax!=null&&v.year>f.yearMax) return false;
      if(f.kmMax!=null&&v.km>f.kmMax) return false;
      if(f.verificado&&!v.verificado) return false;
      if(f.inspeccionado&&!v.inspeccionado) return false;
      if(q){
        var s=(v.marca+' '+v.modelo).toLowerCase();
        if(s.indexOf(q)<0) return false;
      }
      return true;
    });
  };

  window.invMarcas=function(){
    var map={};
    items.forEach(function(v){ map[v.marca]=(map[v.marca]||0)+1; });
    return Object.keys(map).map(function(k){return {marca:k,n:map[k]};}).sort(function(a,b){return b.n-a.n;});
  };

  window.invSugerencias=function(q){
    q=(q||'').trim().toLowerCase();
    if(!q) return [];
    var map={};
    items.forEach(function(v){
      var full=v.marca+' '+v.modelo;
      if(full.toLowerCase().indexOf(q)>=0||v.marca.toLowerCase().indexOf(q)===0){
        var key=v.marca.toLowerCase().indexOf(q)>=0&&full.toLowerCase().indexOf(q)<0?v.marca:full;
        map[key]=(map[key]||0)+1;
      }
    });
    return Object.keys(map).map(function(k){return {txt:k,n:map[k]};}).sort(function(a,b){return b.n-a.n;}).slice(0,6);
  };
})();
