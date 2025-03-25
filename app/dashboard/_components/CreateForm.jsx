"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const PROMPT =
  ", On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format";

function CreateForm() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    setLoading(true);

    let result = null;
    try {
      result = await AiChatSession.sendMessage(
        "Description: " + userInput + PROMPT
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }

    if (result && result.response.text()) {
      const resp = await db
        .insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD/MM/YYYY"),
        })
        .returning({ id: JsonForms.id });
      if (resp[0].id) {
        route.push("/edit-form/" + resp[0].id);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>+ Create Form</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Write a description for your form.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            className="my-2"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            placeholder="Write a description of your form..."
          />

          <div className="flex gap-2 my-1 justify-end">
            <DialogTrigger asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogTrigger>
            <Button disabled={loading} onClick={onCreateForm}>
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
