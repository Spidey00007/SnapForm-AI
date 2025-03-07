"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";
import React, { useEffect, useState } from "react";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState(null);
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

    try {
      const parsedJson = JSON.parse(result[0].jsonform);
      setJsonForm(parsedJson);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    // try {
    //   const parsedJson = JSON.parse(
    //     result[0].jsonform.replace(/^```json\n/, "").replace(/\n```$/, "")
    //   );
    //   setJsonForm(parsedJson);
    // } catch (error) {
    //   console.error("Error parsing JSON:", error);
    // }
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
        <div className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center">
          {jsonForm ? <FormUi jsonForm={jsonForm} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default EditForm;
