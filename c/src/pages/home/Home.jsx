
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  const auth = localStorage.getItem('user');
  
  return (
    <div>
      {auth ? <Sidebar /> : null}
    </div>
  );
}
