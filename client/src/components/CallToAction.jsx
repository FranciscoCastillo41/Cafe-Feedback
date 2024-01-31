import React from "react";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";

export default function CallToAction() {
  return (
    <div style ={{border: "2px solid #5c8ab9", borderRadius: "5px"}}className="flex flex-col sm:flex-row p-3 justify-center items-center"

    >
      <div className="flex-1 justify-center flex flex-col text-center">
        <h2 className="text-2xl">Want to learn more about Texas Wesleyan?</h2>
        <p className="text-muted">Check out the offical website of Texas Wesleyan!</p>
        <Button style={{background: "#0072bc"}}>Learn more</Button>
      </div>
      <div className="p-7 flex-1">
        <Image src="https://th.bing.com/th/id/OIP.NgphJPEz_Zu5gJwVt9yp3AHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7" />
      </div>
    </div>
  );
}
