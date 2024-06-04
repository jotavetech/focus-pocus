import toastify from "toastify-js";

function toast(text: string, error: boolean = false) {
  toastify({
    text,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: error ? "#9f0017" : "#0b0b0b",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "16px",
      fontWeight: "300",
      color: "#fff",
      transition: "all 0.5s ease",
    },
    stopOnFocus: true,
  }).showToast();
}

export default toast;
