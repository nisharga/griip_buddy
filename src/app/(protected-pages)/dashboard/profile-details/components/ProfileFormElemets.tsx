/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import GenderDropdown from "./GenderDropdown";
import { FormInput } from "../../../components";
import DatePicker from "../../../components/date-picker/DatePicker";

export const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProfileFormElemets = ({ form }: any) => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <>
      <motion.div
        className="col-span-12 lg:col-span-6"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <FormInput
          data-testid="profile-details-form-fullName"
          form={form}
          labelClass="input-label"
          className="input"
          name="name"
          label="Full Name"
          placeholder="Ex. Jhon Smith"
        />
      </motion.div>

      <motion.div
        className="col-span-12 lg:col-span-6"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <FormInput
          data-testid="profile-details-form-input"
          form={form}
          labelClass="input-label"
          className="input"
          name="userId"
          label="User Id"
          placeholder="12345"
          disabled={true}
        />
      </motion.div>

      <motion.div
        className="col-span-12 lg:col-span-6"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <FormInput
          data-testid="profile-details-form-email"
          form={form}
          labelClass="input-label"
          className="input"
          name="email"
          label="Email"
          placeholder="Enter your Email"
        />
      </motion.div>

      <motion.div
        className="col-span-12 lg:col-span-6"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <FormInput
          data-testid="profile-details-form-phone"
          form={form}
          labelClass="input-label"
          className="input"
          name="phone"
          label="Phone"
          placeholder="Enter your Phone"
        />
      </motion.div>

      <motion.div
        className="col-span-12 lg:col-span-6"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="font-normal text-sm input-label mb-2!">Gender</div>
        <GenderDropdown form={form} name="gender" />
      </motion.div>

      <motion.div
        className="col-span-12 lg:col-span-6"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="font-normal text-sm input-label mb-2!">
          Date of Birth
        </div>
        <DatePicker
          startYear={1930}
          endYear={2030}
          selected={date}
          onSelect={setDate}
        />
      </motion.div>
    </>
  );
};

export default ProfileFormElemets;
