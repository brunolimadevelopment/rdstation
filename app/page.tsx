"use client"
import React, { useState } from 'react';
import HeroSection from "./_components/hero";
import Ilustration from "./_components/ilustration";
import Form from "./_components/form";

export default function Home() {

  return (
    <main className="my-10 sm:my-0">
      <HeroSection />
      <section className={`sm:mt-12`}>
        <div className="container">
          <div className="flex justify-between flex-col sm:flex-row">
            <Ilustration width={471} height={347} text={false} />
            <Form />
          </div>
        </div>
      </section>
    </main>
  );
}
