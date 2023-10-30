    const h_scr = 600;
	const v_scr = 400; 
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(1000, h_scr/v_scr,  0.01, 100 );
    camera.position.z = 4; 
    camera.position.y = 4;
     
    clock = new THREE.Clock();

	const renderer = new THREE.WebGLRenderer({canvas: HelloCanvas, antialias: true}); 
    renderer.setSize( h_scr, v_scr ); 
    
    const mouse= new THREE.Vector2();
    scene.background=new THREE.Color( 0x444444 );
    const geometry = new THREE.BoxGeometry();

	let material = new THREE.MeshNormalMaterial({
    opacity: 0,
    transparent: true,});

    let material2 = new THREE.MeshNormalMaterial({
    opacity: 0,
    transparent: true,});
    
    let material3 = new THREE.MeshNormalMaterial({
    opacity:0,
    transparent: true,});

	const cube = new THREE.Mesh( geometry, material );
    cube.position.z=0;
    const cube2 = new THREE.Mesh( geometry, material2 );
    cube2.position.x=-2;
    const cube3 = new THREE.Mesh( geometry, material3 );
    cube3.position.x=2;


    scene.add( cube );
    scene.add( cube2 );
    scene.add( cube3 );

    const light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 10, 4 );
    light.castShadow = true; // default false
    scene.add( light );








       
    var mouseDown = false,
    mouseX = 0,
    mouseY = 0;

    //사용자에게 웹페이지가 보여지는 영역을 기준으로 좌표를 표시
    function onMouseMove(event) {
        if (!mouseDown) {
            return;
        }
        event.preventDefault();
        let rotateX = event.clientX - mouseX 
        let rotateY = event.clientY - mouseY;
        mouseX = event.clientX;
        mouseY = event.clientY;
        
        rotateScene(rotateX, rotateY);
    }

    function onMouseDown(event) {
        event.preventDefault();
        mouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function onMouseUp(event) {
        event.preventDefault();
        mouseDown = false;
    }

    function addMouseHandler(canvas) {
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false); 
    }

    function rotateScene(rotateX, rotateY) {
        cube.rotation.y += rotateX/100 ;
        cube.rotation.x += rotateY/100 ;
    }
   
    const removeButton = document.querySelector('#remove');
    removeButton.addEventListener('click', () => {
        if(cube3.material.opacity){
       cube3.material.opacity=0;
        }
        else{
            cube3.material.opacity=1;
        }
       scene.add(cube3)
    })

    const removeButton2 = document.querySelector('#remove2');
    removeButton2.addEventListener('click', () => {
        if(cube2.material.opacity){
       cube2.material.opacity=0;
        }
        else{
            cube2.material.opacity=1;
        }
       scene.add(cube2)
    })
    const removeButton3 = document.querySelector('#remove3');
    removeButton3.addEventListener('click', () => {
        if(cube.material.opacity){
       cube.material.opacity=0;
        }
        else{
            cube.material.opacity=1;
        }
       scene.add(cube3)
      
    })


    const movecam=function(time){
        camera.position.x = Math.sin( time ) * 2;
        camera.position.y = Math.cos( time ) * 2;
 
    }


    const animate = function () {
            requestAnimationFrame( animate );
            let time = clock.getElapsedTime();
    
            camera.lookAt( cube.position );
            movecam(time);
            cube2.rotation.x += 0.02;
            cube2.rotation.y += 0.02;
            renderer.render( scene, camera );
        };


        addMouseHandler(HelloCanvas);
        animate();
