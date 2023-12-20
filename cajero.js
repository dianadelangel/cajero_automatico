var cuentas = [
    { nombre: "Mali", saldo: 200 },
    { nombre: "Gera", saldo: 290 },
    { nombre: "Maui", saldo: 67 }
  ];
  
  var usuarioActual = null;
  
  function login() {
    var cuentaIndex = document.getElementById("cuentasDropdown").value;
    var passwordInput = document.getElementById("passwordInput").value;
  
    if (cuentas[cuentaIndex] && passwordInput === "1234") {
      usuarioActual = cuentas[cuentaIndex];
      // Ocultar los elementos de inicio de sesión
      document.getElementById("inicioSesion").classList.add("hidden");
      // Mostrar los elementos del usuario autenticado
      document.getElementById("nombreUsuario").innerText = usuarioActual.nombre;
      document.getElementById("usuarioIcon").style.display = "inline";
      document.getElementById("operaciones").classList.remove("hidden");
      document.getElementById("resultado").classList.add("hidden");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña incorrecta',
        text: 'Por favor, inténtelo nuevamente.',
      });
    }
  }
  
  
  function consultarSaldo() {
    mostrarResultado("Saldo actual: $" + usuarioActual.saldo);
  }
  
  function ingresarMonto() {
    Swal.fire({
      title: 'Ingresar Monto',
      html:
        `<p>Saldo actual: $${usuarioActual.saldo}</p>` +
        '<input type="number" id="montoInput" class="swal2-input" placeholder="Ingrese el monto">',
      showCancelButton: true,
      confirmButtonText: 'Ingresar',
      preConfirm: () => {
        const montoInput = document.getElementById('montoInput').value;
        return parseFloat(montoInput);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const monto = result.value;
        if (!isNaN(monto) && monto > 0) {
          const nuevoSaldo = usuarioActual.saldo + monto;
  
          if (nuevoSaldo <= 990) {
            usuarioActual.saldo = nuevoSaldo;
            mostrarResultado(`Se ingresó $${monto}. Nuevo saldo: $${usuarioActual.saldo}`);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Excede el límite permitido',
              text: 'El monto ingresado excede el límite permitido de $990.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Monto no válido',
            text: 'Por favor, ingrese un monto válido.',
          });
        }
      }
    });
  }
  
  
  function retirarMonto() {
    Swal.fire({
      title: 'Retirar Monto',
      html:
        `<p>Saldo actual: $${usuarioActual.saldo}</p>` +
        '<input type="number" id="montoInput" class="swal2-input" placeholder="Ingrese el monto a retirar">',
      showCancelButton: true,
      confirmButtonText: 'Retirar',
      preConfirm: () => {
        const montoInput = document.getElementById('montoInput').value;
        return parseFloat(montoInput);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const monto = result.value;
        if (!isNaN(monto) && monto > 0 && monto <= usuarioActual.saldo && usuarioActual.saldo - monto >= 10) {
          usuarioActual.saldo -= monto;
          mostrarResultado(`Se retiró $${monto}. Nuevo saldo: $${usuarioActual.saldo}`);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Monto no válido',
            text: 'El monto ingresado no es válido o excede el límite de saldo permitido.',
          });
        }
      }
    });
  }
  
  
  function mostrarResultado(mensaje) {
    Swal.fire({
      icon: 'success',
      title: 'Operación Exitosa',
      text: mensaje,
    });
  }
  
  function cerrarSesion() {
    // Mostrar los elementos de inicio de sesión
    document.getElementById("inicioSesion").classList.remove("hidden");
    // Ocultar los elementos del usuario autenticado
    document.getElementById("nombreUsuario").innerText = "";
    document.getElementById("operaciones").classList.add("hidden");
    document.getElementById("resultado").classList.add("hidden");
  }