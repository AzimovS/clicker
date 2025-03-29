"use client";

import type { NextPage } from "next";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: count } = useScaffoldReadContract({ contractName: "Counter", functionName: "count" });

  const { writeContractAsync: writeCounterContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "Counter",
  });

  const handleClick = async () => {
    try {
      await writeCounterContractAsync({ functionName: "increment" });
    } catch (e) {
      console.error("Error incrementing counter", e);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Simple Clicker</span>
          </h1>
        </div>

        <button className="btn btn-primary btn-circle btn-lg" onClick={handleClick} disabled={isMining}>
          {count}
        </button>
      </div>
    </>
  );
};

export default Home;
