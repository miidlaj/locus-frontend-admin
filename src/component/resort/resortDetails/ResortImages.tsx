import React from "react";

type ImageType = {
    id: number;
    originalImageLink: string;
    resizedImageLink: string;
};

type ResortImageProps = {
    images: ImageType[] | undefined
}
const ResortImages = (props: ResortImageProps) => {

    const {images } = props

    console.log(images);
    
  return (
    <>
      <section className="py-8 px-4">
        <div className="flex flex-wrap -mx-4 -mb-8">
          
          {
            images !== undefined &&
            images.map((image, index) => (
                <div key={index} className="md:w-1/4 px-4 mb-8">
            <img
              className="rounded shadow-md"
              src={image.originalImageLink}
              alt={"Image" + index}
            />
          </div>
            ))
          }

          
        </div>
      </section>
    </>
  );
};

export default ResortImages;
