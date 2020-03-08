import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "@components/head";
import Container from "@components/Container";
import Button from "@components/Button";
import styled from "styled-components";
import to from "../lib/to";
import checkStatus from "../lib/checkStatus";
import Text from "@components/Text";
import Input from "@components/Input";
import Box from "@components/Box";
import Label from "@components/Label";
import Heading from "@components/Heading";
import validateForm from "../lib/validateForm";
import { motion } from "framer-motion";
import Loader from "@components/Loader";
import { drawFrame } from "../lib/drawingTools";
import CanvasButton from "@components/CanvasButton";

if (typeof window !== `undefined`) {
  HTMLCanvasElement.prototype.renderImage = function(
    blob,
    x,
    y,
    width,
    height
  ) {
    return new Promise(resolve => {
      var ctx = this.getContext("2d");
      var img = new Image();

      img.onload = function() {
        ctx.drawImage(img, x, y, width, height);
        resolve();
      };

      img.src = URL.createObjectURL(blob);
    });
  };
}

const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const doAction = async (promise, { clearError = true } = {}) => {
    setIsLoading(true);
    if (clearError) setError(false);

    const [err, result] = await to(promise);

    setIsLoading(false);
    if (err) {
      setError(err);
      return [err];
    }

    return [null, result];
  };

  return { isLoading, isError: !!error, error, doAction };
};

const Home = () => {
  const [imageUrl, setImageUrl] = useState();
  const { isLoading, isError, doAction, error } = useLoadingState();

  const [selectedFrame, setSelectedFrame] = useState(0);
  const frameOptionRef = useRef();
  const frameOption2Ref = useRef();

  useEffect(() => {
    const { width, height } = frameOptionRef.current.getBoundingClientRect();
    console.log(width, height);
    const ctx = frameOptionRef.current.getContext("2d");
    frameOptionRef.current.width = width;
    frameOptionRef.current.height = height;

    drawFrame(ctx, width, height, { v: 5, h: 15 });

    const ctx2 = frameOption2Ref.current.getContext("2d");
    frameOption2Ref.current.width = width;
    frameOption2Ref.current.height = height;
    drawFrame(ctx2, width, height, { v: 5, h: 15 }, { borderRadius: 0 });
  }, []);

  const [formState, setFormState] = useState({
    url: "",
    width: 1280,
    height: 800
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageData, setImagedata] = useState();

  //Validate the form
  const checkFormValidation = async formState => {
    const [err, value] = await validateForm({ ...formState });

    const isValid = !err;
    if (isValid !== isFormValid) setIsFormValid(isValid);
  };

  //Handle form input updates
  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
    checkFormValidation(newFormState);
  };

  const getScreenshot = async () => {
    if (!isFormValid) return;
    console.log("ok");

    const params = Object.keys(formState)
      .map(key => key + "=" + encodeURIComponent(formState[key]))
      .join("&");

    console.log(params);

    const [err, resp] = await doAction(
      fetch("http://localhost:3000/api/screenshot?" + params).then(checkStatus)
    );
    if (err) return;

    const blob = await resp.blob();

    setImagedata(blob);

    console.log("done");
  };

  useEffect(() => {
    if (!imageData) return;
    renderImageWithFrame();
  }, [imageData]);

  useEffect(() => {
    if (!imageData) return;
    renderImageWithFrame();
  }, [selectedFrame]);

  const renderImageWithFrame = async () => {
    const FrameWidth = { h: 50, v: 10 };
    const CanvasWidth = +formState.width + 2 * FrameWidth.v;
    const CanvasHeight = +formState.height + 2 * FrameWidth.h;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = CanvasWidth;
    canvas.height = CanvasHeight;

    await canvas.renderImage(
      imageData,
      FrameWidth.v,
      FrameWidth.h,
      +formState.width,
      +formState.height
    );

    if (selectedFrame === 1)
      drawFrame(ctx, CanvasWidth, CanvasHeight, FrameWidth);
    if (selectedFrame === 2)
      drawFrame(ctx, CanvasWidth, CanvasHeight, FrameWidth, {
        borderRadius: 0
      });

    setImageUrl(canvas.toDataURL("png"));
    //setImageUrl(URL.createObjectURL(blob));
  };

  return (
    <div>
      <Head title="Home" />

      <Container py="6">
        <Heading fontSize="2xl" mb="6">
          Make a beautiful website screenshot!
        </Heading>
        <form>
          <Box width={[1, 1 / 2]} mb="6">
            <Box mb="6">
              <Label mb="2">Website URL</Label>
              <Input
                type="text"
                placeholder="sebtoombs.com"
                value={formState.url}
                onChange={handleChange}
                name="url"
              />
            </Box>
            <Box mb="6">
              <Label mb="2">Width</Label>
              <Input
                type="number"
                placeholder="1280"
                value={formState.width}
                onChange={handleChange}
                name="width"
              />
            </Box>
            <Box mb="6">
              <Label mb="2">Height</Label>
              <Input
                type="number"
                placeholder="800"
                value={formState.height}
                onChange={handleChange}
                name="height"
              />
            </Box>
            <Box
              mb="6"
              display="flex"
              css={`
                margin-left: -0.5rem;
                margin-right: -0.5rem;
              `}
            >
              <Box width={[1 / 2, 1 / 4]} px="2">
                <CanvasButton
                  active={selectedFrame === 0}
                  onClick={() => setSelectedFrame(0)}
                />
              </Box>
              <Box width={[1 / 2, 1 / 4]} px="2">
                <CanvasButton
                  ref={frameOptionRef}
                  active={selectedFrame === 1}
                  onClick={() => setSelectedFrame(1)}
                />
              </Box>
              <Box width={[1 / 2, 1 / 4]} px="2">
                <CanvasButton
                  ref={frameOption2Ref}
                  active={selectedFrame === 2}
                  onClick={() => setSelectedFrame(2)}
                />
              </Box>
            </Box>
          </Box>
          <Button
            variant="primary"
            onClick={getScreenshot}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? `Getting screenshot...` : `Get screenshot`}
          </Button>
        </form>

        {isError ? (
          <Text color="errorText">
            Something went wrong: <pre>{JSON.stringify(error)}</pre>
          </Text>
        ) : null}

        {isLoading ? (
          <Box mx="auto">
            <Loader />
          </Box>
        ) : null}

        <Box maxWidth="md" mx="auto">
          {imageUrl ? (
            <>
              <Box py="8">
                <img
                  src={imageUrl}
                  css={`
                    max-width: 100%;
                  `}
                />
              </Box>
              <Box>
                <Button
                  as="a"
                  href={imageUrl}
                  download="screenshot.png"
                  variant="outline-primary"
                >
                  Save
                </Button>
              </Box>
            </>
          ) : null}
        </Box>
      </Container>
    </div>
  );
};

export default Home;
