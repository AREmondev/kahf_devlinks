"use client";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SectionCard from "../common/SectionCard";
import Text from "../ui/Text";
import Button from "../ui/Button";
import LinkItem from "./LinkItem";
import { FaPlus } from "react-icons/fa";
import { Link } from "../../types/link";
import { addLinks, deleteLink, getUserLinks } from "@/services/links.service";
import { useUserProfileStore } from "@/store/userProfileStore";
import { toast } from "react-toastify";

interface FormData {
  links: Link[];
}

const Links = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      links: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "links",
  });

  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    console.log("links", userProfile.links);
    reset({ links: userProfile.links });
  }, [userProfile]);

  const links = watch("links");

  const addNewLink = () => {
    append({ id: `link-${Date.now()}`, platform: "", url: "" });
  };
  const setUserProfile = useUserProfileStore((state) => state.updateProfile);
  const fetchLinks = async () => {
    const response = await getUserLinks();
    console.log(response);
    setUserProfile({
      ...userProfile,
      links: response.data,
    });
  };
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await addLinks(data.links);

      if (response.success) {
        fetchLinks();
        toast.success("Links saved successfully");
      } else {
        toast.error("Failed to save links");
      }
    } catch (error) {
      console.error("Failed to save links:", error);
      toast.error("Failed to save links");
    }
    setLoading(false);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };
  // Get all selected platforms
  const selectedPlatforms = links.map((link) => link.platform).filter(Boolean);
  const handleDlt = async (index: number, id: string) => {
    console.log(index, id);
    const response = await deleteLink(id);
    console.log(response);
    if (response.success) {
      toast.success("Link deleted successfully");
      remove(index);
      setUserProfile({
        ...userProfile,
        links: userProfile.links.filter((link: any) => link._id !== id),
      });
    } else {
      toast.error("Failed to delete link");
    }
  };
  return (
    <SectionCard className="col-span-12 md:col-span-7 flex flex-col w-full gap-5">
      <div className="flex flex-col gap-2.5">
        <Text className="" variant="sectionTitle">
          Customize your links
        </Text>
        <Text className="" variant="base">
          Add/edit/remove links below and then share your profile with the
          world!
        </Text>
      </div>
      <Button
        outline
        className="w-full"
        title="Add new link"
        variant="add"
        icon={<FaPlus />}
        onClick={addNewLink}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <form
              onSubmit={handleSubmit(onSubmit)}
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col w-full gap-5"
            >
              {fields.map((field: any, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-5 rounded-md bg-background"
                    >
                      <LinkItem
                        control={control}
                        index={index}
                        remove={() => handleDlt(index, field._id)}
                        selectedPlatforms={selectedPlatforms}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {links.length > 0 && (
                <div className="flex items-center justify-end w-full">
                  <Button
                    loading={loading}
                    type="submit"
                    title="Save"
                    variant="primary"
                    className="w-fit"
                  />
                </div>
              )}
            </form>
          )}
        </Droppable>
      </DragDropContext>
    </SectionCard>
  );
};

export default Links;
