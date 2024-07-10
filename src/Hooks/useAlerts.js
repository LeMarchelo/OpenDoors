import Swal from 'sweetalert2';

export const useAlerts = () => {

  function basicAlert(title,text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    })
  } 

  return [basicAlert]
}
export default useAlerts;