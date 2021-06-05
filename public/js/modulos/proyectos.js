import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', (event) => {

        const urlProyecto = event.target.dataset.proyectoUrl;

        Swal.fire({
            title: '¿Deseas eliminar este proyecto?',
            text: "Este cambio no podrá ser revertido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, { params: { urlProyecto } })
                    .then(function (respuesta) {
                        console.log(respuesta);

                        Swal.fire(
                            'Eliminado',
                            respuesta.data,
                            'success'
                        );

                        setTimeout(() => {
                            window.location.href = '/';
                        }, 2000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: error,
                            title: 'Ocurrió un error',
                            text: 'No se pudo eliminar el proyecto'
                        });
                    });
            };
        });
    });
};

export default btnEliminar;
