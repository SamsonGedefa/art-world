import Head from "next/head";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "../Nav";
import { Modal } from "@/components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

export default function Layout({ children }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative w-screen">
      {modalOpen && <Modal handleClose={handleClose} />}

      <Nav />

      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />

        <main className="flex-1 ml-20 bg-[#0E1016]">{children}</main>
      </div>
    </div>
  );
}

// bg-[#06070D]
