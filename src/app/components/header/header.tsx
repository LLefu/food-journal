import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}



const Header: React.FC<HeaderProps> = ({ title }) => {
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  async function getName() {
    const userId = localStorage.getItem('userId');
    const response = await fetch("../api/user/get-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userId)
    })
    if (response.status === 200) {
      const json = await response.json()
      setName(json.name)
    }
  }
  
  function logOut(){
    localStorage.removeItem("userId")
    router.push("/pages/login")
  }

  useEffect(() => {
    getName()
  }, [])

  const modalTheme = {
    "root": {
      "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-black bg-opacity-40 dark:bg-opacity-80",
        "off": "hidden"
      }
    },
    "content": {
      "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-neutral-500 shadow text-white"
    },
  }

  return <div className={styles.header}>
    <Modal theme={modalTheme} className="pt-[250px]" size="md" position="center" show={openModal} onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-white">
            Are you sure you want to log out?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => logOut()}>
              Yes
            </Button>
            <Button className="bg-neutral-400 border-neutral-400" color="white" onClick={() => setOpenModal(false)}>
              No
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    <div className="flex">
      <div><i className="fa fa-circle"></i></div>
      <p className="ps-2">{title}</p>
    </div>
    <div onClick={() => {setOpenModal(true)}} className="pe-4 font-extrabold"><i className="fa fa-sign-out pe-2" />{name}</div>
  </div>;
};

export default Header;