angular
  .module('collaborato')
  .controller('rendersShowController', RendersShowController);

RendersShowController.$inject = ['Project', '$stateParams'];
function RendersShowController(Project, $stateParams){
  var vm = this;


// The entire 3D functionality is inside this function to allow the file to be looked up from AWS (the data)
  Project.get({id: $stateParams.project_id }).$promise.then(function(data){
    vm.project = data.project;
    vm.file    = data.project.files[$stateParams.id];
    // console.log(vm.file);
  });

    var container, stats;
    var camera, scene, renderer;

    var particleMaterial;
    var raycaster;
    var mouse;
    var objects = [];
    init();
    animate();
    function init() {
      container = document.createElement( 'div' );
      document.body.appendChild( container );
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.set( 0, 300, 500 );
      scene = new THREE.Scene();
      var geometry = new THREE.BoxGeometry( 100, 100, 100 );
      for ( var i = 0; i < 10; i ++ ) {




        var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ) );
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;
        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        scene.add( object );
        objects.push( object );
      }
      // var PI2 = Math.PI * 2;
      // console.log(THREE.SpriteCanvasMaterial);
      // particleMaterial = new THREE.SpriteCanvasMaterial( {
      //   color: 0x000000,
      //   program: function ( context ) {
      //     context.beginPath();
      //     context.arc( 0, 0, 0.5, 0, PI2, true );
      //     context.fill();
      //   }
      // } );

      var particleMaterial = new THREE.ParticleBasicMaterial({
          color: 0xFFFFFF,
          size: 20,
          map: THREE.ImageUtils.loadTexture("/assets/particle.png"),
          blending: THREE.AdditiveBlending,
          transparent: true
      });

      // new raycaster to be activated on mouse click
      raycaster = new THREE.Raycaster();
      // vector to be drawn from the mouse normal
      mouse = new THREE.Vector2();

      // new renderer with background set to white.
      renderer = new THREE.WebGLRenderer({antialias:true,  alpha: true });

      // WINDOW SETTINGS
      // set the pix ratio
      renderer.setPixelRatio(window.devicePixelRatio);
      // set the size of the window
      renderer.setSize(window.innerWidth, window.innerHeight);
      // put the 3D scene on the window
      container.appendChild(renderer.domElement);
      //EVENT HANDLING
      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);
      window.addEventListener('resize', onWindowResize, false);
    }
    // SIZE CONTROL
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentTouchStart( event ) {
      event.preventDefault();
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
      onDocumentMouseDown( event );
    }

    function onDocumentMouseDown( event ) {
      event.preventDefault();
      mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

      // raycaster is set as the normal of the mouse, through the camera's normal
      raycaster.setFromCamera( mouse, camera );

      // finds the intersects between the raycaster and the intersected object
      var intersects = raycaster.intersectObjects( objects );
      if ( intersects.length > 0 ) {
        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
        var particle = new THREE.Sprite( particleMaterial );
        particle.position.copy( intersects[ 0 ].point );
        particle.scale.x = particle.scale.y = 16;
        scene.add( particle );
      }
      /*
      // Parse all the faces
      for ( var i in intersects ) {
        intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );
      }
      */
    }
    //
    function animate() {
      requestAnimationFrame( animate );
      render();
    }

    var radius = 600;
    var theta = 0;
    function render() {
      // theta += 0.1;
      // camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
      // camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
      // camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
      camera.lookAt( scene.position );
      renderer.render( scene, camera );
    }


// **********GECKOEXAMPLE**********
  // Set up the scene, camera, and renderer as global variables.
  var scene, camera, renderer;

  init();
  animate();

  // Sets up the scene.
  function init() {
    // console.log(data);

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true,  alpha: true });
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
    // renderer.setClearColor( 0x000000, 0 ); // the default

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    // Load in the mesh and add it to the scene.
    var loader = new THREE.JSONLoader();
    loader.load( vm.file, function(geometry){
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
