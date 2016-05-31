angular
  .module('collaborator')
  .controller('rendersShowController', RendersShowController);

RendersShowController.$inject = ['Project', '$stateParams'];
function RendersShowController(Project, $stateParams){
  var vm = this;

  Project.get({id: $stateParams.project_id }).$promise.then(function(data){
    console.log(data.project);
    vm.project = data.project;
    vm.file    = data.project.files[$stateParams.id];
  });

  init();
  animate();

  var scene, camera, renderer;
  var geometry, material, mesh;

  function init() {
    scene             = new THREE.Scene();
    camera            = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.y = 0;
    camera.position.z = 1000;
    geometry          = new THREE.BoxGeometry(200, 200, 200);

    loader = new THREE.JSONLoader();

    loader.load("/3Dmodels/skull_art.stl", function( geometry ) {
        console.log("loader is being called?");
        mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
        mesh.scale.set( 10, 10, 10 );
        mesh.position.y = 150;
        mesh.position.x = 0;
      } );

    loader.onLoadComplete=function(){
      scene.add( mesh );
    };


    material          = new THREE.MeshBasicMaterial( { color: 0xff5533, wireframe: true } );
    mesh              = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer          = new THREE.WebGLRenderer({ alpha: true });
    // var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.querySelector(".renderZone").appendChild( renderer.domElement );
  }



  function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render( scene, camera );
  }

// controls = new THREE.TrackballControls(camera);

// scene = new THREE.Scene();

}
