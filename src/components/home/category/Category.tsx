"use client";

import React from "react";
import Container from "@/components/shared/common/Container";
import CategoryCarousel from "./CategoryCarousel";

const Category = () => {
  return (
    <Container as="section">
      <CategoryCarousel />
    </Container>
  );
};

export default Category;
