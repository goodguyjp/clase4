const {Pool} = require('pg');

const config = {
    user: "postgres",
    password: "admin",
    host: "localhost",
    database: "clase4_always_music",
    port: 5500,
};

const pool = new Pool(config);

const argumentos = process.argv.slice(2);

const funcion = argumentos[0];
const nombre = argumentos[1];
const rut = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

const nuevoEstudiante = async () =>{
    try { await pool.query(`INSERT INTO estudiantes(nombre, rut, curso, nivel) values('${nombre}', '${rut}', '${curso}', '${nivel}'); `);
    console.log(`Estudiante ${nombre} agregado con exito`);
    pool.end();
    }catch (error) {
        console.log((error.code));
    }finally{
        pool.end();
    }
}

const consultaEstudiantes = async () =>{
    try {
        const res = await pool.query(`SELECT * from estudiantes; `);

    console.log("Registro Actual", res.rows);
    pool.end();
    }catch (error) {
        console.log((error.code));
        pool.end();
    }
    
}

const editarEstudiantes = async () =>{
    try {
        await pool.query(`UPDATE estudiantes SET nombre='${nombre}', curso='${curso}', nivel='${nivel}' WHERE rut='${rut}'; `);

        console.log(`Estudiante ${nombre} editado con exito`);
    pool.end();
    }catch (error) {
        console.log((error.code));
        pool.end();
    }
    
}

const rutEstudiantes = async () =>{
    try {
        const res = await pool.query(`SELECT * from estudiantes WHERE rut='${rut}'; `);

        console.log(res.rows);
    pool.end();
    }catch (error) {
        console.log((error.code));
        pool.end();
    }
    
}

const eliminarEstudiantes = async () =>{
    try {
        await pool.query(`DELETE from estudiantes WHERE rut='${rut}';`);

        console.log(`Registro de estudiante con rut ${rut} eliminado`);
        pool.end();
    }catch (error) {
        console.log((error.code));
        pool.end();
    }
    
}

//IIFE
(async() => {    
    if(funcion == 'nuevo'){
    await nuevoEstudiante();

}else if(funcion === 'consulta'){
    await consultaEstudiantes();
}else if(funcion === 'editar'){
    await editarEstudiantes();
}else if(funcion === 'rut'){
    await rutEstudiantes();
}else if(funcion === 'eliminar'){
    await eliminarEstudiantes();
}else {
    console.log("Funcion ingresada no disponible");
}
})();


//ejecutarFunciones();  se cambia la ejecucion de la funcion por una IIFE

