import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type IndividualCountryProps = {
  name: { common: string };
  continents: string[];
  flags: { png: string };
};

const FlagCard = () => {
  const fetchCountryDetails = async (): Promise<
    IndividualCountryProps[] | null
  > => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("API error", error);
      return null;
    }
  };

  const {
    data: countryArray,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["GET_COUNTRY_DETAILS"],
    queryFn: fetchCountryDetails,
    staleTime: 10000,
  });

  if (isPending) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <img src="/src/assets/loading.gif" alt="Loading..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="  w-screen h-screen flex justify-center items-center">
        <h2>There was an error fetching data</h2>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-3xl">Country Flags</h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 py-3 px-2">
        {countryArray?.map((induvidualCountries: IndividualCountryProps) => (
          <div
            className="fles gap-1 px-2 py-2 bg-red-300 text-black"
            key={induvidualCountries.name.common}
          >
            <img
              src={induvidualCountries.flags.png}
              alt={induvidualCountries.name.common}
              className="w-full"
            />
            <h3 className="font-semi text-lg text-center">
              {induvidualCountries.name.common}
            </h3>
            <p className="font-light text-sm text-center">
              {induvidualCountries.continents[0]}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlagCard;
