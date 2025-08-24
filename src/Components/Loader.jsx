import { ThreeDots} from "react-loader-spinner";

export function Loader() {
  return (
    <div style={{ display: "flex", justifyContent:"center", alignItems:"center", marginTop: "120px"}}>
      <ThreeDots height={100} width={100} color="#0F161E" />
    </div>
  );
}