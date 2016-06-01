angular
  .module('collaborator')
  .controller('rendersShowController', RendersShowController);

RendersShowController.$inject = ['Project', '$stateParams'];
function RendersShowController(Project, $stateParams){
  var vm = this;

  Project.get({id: $stateParams.project_id }).$promise.then(function(data){
    // console.log(data.project);
    vm.project = data.project;
    vm.file    = data.project.files[$stateParams.id];
  });












// **********GECKOEXAMPLE**********
  // Set up the scene, camera, and renderer as global variables.
  var scene, camera, renderer;

  init();
  animate();

  // Sets up the scene.
  function init() {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,6,0);
    scene.add(camera);

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    // Set the background color of the scene.
    // renderer.setClearColorHex(0x333F47, 1);
    // renderer.setClearColorHex(0xff0000, 1);

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    // Load in the mesh and add it to the scene.
    var loader = new THREE.JSONLoader();
    loader.load( "/3Dmodels/treehouse_logo.js", function(geometry){
      var material = new THREE.MeshLambertMaterial({color: 0x55B663});
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

  }


  // Renders the scene and updates the render as needed.
  function animate() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    // Render the scene.
    renderer.render(scene, camera);
    controls.update();

  }


















// ********************
  // <script>
  // var container, camera, scene, renderer;
  //
  // init();
  // animate();
  //
  // function init(){
  //     container=document.createElement('div');
  //     document.body.appendChild(container);
  //
  //     camera=new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
  //     camera.position.set(3, 0.5, 3);
  //
  //     scene=new THREE.Scene();
  //
  //     // object
  //     var loader=new THREE.STLLoader();
  //     loader.addEventListener('load', function (event){
  //         var geometry=event.content;
  //         var material=new THREE.MeshLambertMaterial({ ambient: 0xFBB917,color: 0xfdd017 });
  //         var mesh=new THREE.Mesh(geometry, material);
  //         scene.add(mesh);});
  //
  //     // STL file to be loaded
  //     loader.load('/3Dmodels/pikachu.stl');
  //
  //     // lights
  //     scene.add(new THREE.AmbientLight(0x736F6E));
  //
  //     var directionalLight=new THREE.DirectionalLight(0xffffff, 1);
  //     directionalLight.position=camera.position;
  //     scene.add(directionalLight);
  //
  //     // renderer
  //
  //     renderer=new THREE.WebGLRenderer({ antialias: true });
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //
  //     container.appendChild(renderer.domElement);
  //
  //     window.addEventListener('resize', onWindowResize, false);}
  //
  // function addLight(x, y, z, color, intensity){
  //     var directionalLight=new THREE.DirectionalLight(color, intensity);
  //     directionalLight.position.set(x, y, z);
  //     scene.add(directionalLight);}
  //
  // function onWindowResize(){
  //     camera.aspect=window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);}
  //
  //   function animate(){
  //       requestAnimationFrame(animate);
  //       render();}
  //
  //   function render(){
  //       var timer=Date.now() * 0.0005;
  //       r=150;
  //       camera.position.x=r*Math.cos(timer);
  //       camera.position.z=r*Math.sin(timer);
  //       camera.lookAt(scene.position);
  //       renderer.render(scene, camera);
  //       renderer.setClearColor(0xf5f5f5, 1);}
  // </script>
  //
  // </body>
  // </html>


// *************************************

  //
  // init();
  // animate();
  //
  // var scene, camera, renderer;
  // var geometry, material, mesh;
  //
  // function init() {
  //   scene             = new THREE.Scene();
  //   camera            = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
  //   camera.position.y = 0;
  //   camera.position.z = 2000;
  //   geometry          = new THREE.BoxGeometry(200, 200, 200);
  //
  //   loader            = new THREE.JSONLoader();
  //
  //   loader.load("/3Dmodels/pikachu.json", function( geometry ) {
  //       console.log("loader is being called?");
  //       pikachu = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
  //       mesh.scale.set( 10, 10, 10 );
  //       mesh.position.y = 150;
  //       mesh.position.x = 0;
  //       loader.onLoadComplete = function(){
  //         scene.add( pikachu );
  //       };
  //     } );
  //
  //
  //
  //   material          = new THREE.MeshBasicMaterial( { color: 0xff5533, wireframe: true } );
  //   mesh              = new THREE.Mesh(geometry, material);
  //   scene.add(mesh);
  //   renderer          = new THREE.WebGLRenderer({ alpha: true });
  //   // var renderer = new THREE.WebGLRenderer({ alpha: true });
  //   renderer.setSize( window.innerWidth, window.innerHeight );
  //   document.querySelector(".renderZone").appendChild( renderer.domElement );
  // }
  //
  //
  //
  // function animate() {
  //   requestAnimationFrame( animate );
  //   mesh.rotation.x += 0.01;
  //   mesh.rotation.y += 0.01;
  //   renderer.render( scene, camera );
  // }

// controls = new THREE.TrackballControls(camera);

// scene = new THREE.Scene();

}
