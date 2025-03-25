"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFormList();
    }
  }, [user]);

  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);
  };

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.map((form, index) => {
        let parsedJson = JSON.parse(form.jsonform);
        // If parsedJson is an array, take the first element; otherwise, use it directly
        const jsonForm = Array.isArray(parsedJson) ? parsedJson[0] : parsedJson;

        return (
          <div key={index}>
            <FormListItem
              jsonForm={jsonForm}
              formRecord={form}
              refreshData={GetFormList}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FormList;
