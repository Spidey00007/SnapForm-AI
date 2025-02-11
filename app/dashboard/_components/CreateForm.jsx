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

function CreateForm() {
  const [userInput, setUserInput] = useState("");

  const onCreateForm = () => {
    console.log(userInput);
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

          <div className="flex gap-2 my-3 justify-end">
            <DialogTrigger asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogTrigger>
            <Button onClick={onCreateForm}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
