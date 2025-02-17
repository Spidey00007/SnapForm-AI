"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const router = useRouter();

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    console.log(
      JSON.parse(
        result[0].jsonform.replace(/^```json\n/, "").replace(/\n```$/, "")
      )
    );
    setJsonForm(
      JSON.parse(
        result[0].jsonform.replace(/^```json\n/, "").replace(/\n```$/, "")
      )
    );
  };

  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        Back
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">controller</div>
        <div className="md:col-span-2 border rounded-lg p-4 h-screen">form</div>
      </div>
    </div>
  );
}

export default EditForm;
