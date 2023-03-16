import { Grid, IconButton } from "@mui/material";
import React from "react";
import DirectionsIcon from "@mui/icons-material/Directions";

type locationDetails = {
  id: 1;
  location: string;
  lattitude: string;
  longitude: string;
};
interface LocationProps {
  locationDetails: locationDetails | undefined;
}
const ResortLocation = (props: LocationProps) => {
  const { locationDetails } = props;
  return (
    <>
      <Grid container spacing={2} paddingTop={5}>
        <Grid item xs={6}>
          {/* Line Overview*/}
          <div className="flex items-center py-4">
            <div className="flex-grow h-[0.3px] bg-highlight"></div>

            <span className="flex-shrink text-2xl text-gray-500 px-4 italic font-light">
              Location
            </span>

            <div className="flex-grow h-[0.3px] bg-highlight"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Location:{"         "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{locationDetails?.location}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Lattitude:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{locationDetails?.lattitude}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Longitude:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{locationDetails?.longitude}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              View in Maps:{" "}
            </div>
            <div className="font-mono font-light w-[28rem]">
                <a href={`https://maps.google.com/?q=${locationDetails?.lattitude},${locationDetails?.longitude}`} target="_self">
              <button className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-900/75 text-white/75 text-sm font-medium rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-highlight"
                >
                  <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
                </svg>{" "}
                &nbsp;Google Map
              </button>
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ResortLocation;
