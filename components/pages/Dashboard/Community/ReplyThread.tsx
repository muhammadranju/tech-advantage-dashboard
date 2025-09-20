"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { GrGroup } from "react-icons/gr";

const mainPost = {
  id: 1,
  user: {
    name: "Mohammad Rafiul Islam",
    avatar:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    initials: "MR",
  },
  timestamp: "~12:03 PM",
  content:
    "Hi everyone I'm planning to launch a small e-commerce business selling handmade crafts. What are some low-cost marketing strategies you've tried that actually worked?",
  repliesCount: 23,
  images: [],
};

const replies = [
  {
    id: 2,
    user: {
      name: "Noah Pierre",
      avatar:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      initials: "NP",
    },
    timestamp: "58 min ago",
    content:
      "WhatsApp and Facebook groups are underrated. I created a local buyers' group and kept posting discounts—got my first 50 customers from there.",
    images: [],
  },
  // Duplicate as per image, but with same content
  {
    id: 3,
    user: {
      name: "Noah Pierre",
      avatar:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      initials: "NP",
    },
    timestamp: "58 min ago",
    content:
      "WhatsApp and Facebook groups are underrated. I created a local buyers' group and kept posting discounts—got my first 50 customers from there.",
    images: [],
  },
];

function ReplyThread() {
  return (
    <div className="mx-auto p-10">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Aspiring Business Group
        </h1>

        {/* Featured Card */}
        <div className="w-fit p-2 rounded-lg shadow-md">
          <img
            src="https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg" // Kept the original, as tool didn't yield a usable URL
            alt="Montreal Winter Sports"
            className="w-60 h-60 object-cover rounded-xl"
          />
          <div className="mt-2 flex items-center">
            <span className="text-xl mr-1">
              <GrGroup />
            </span>
            <span className="text-base font-semibold">
              Aspiring Business Solution
            </span>
          </div>
        </div>
      </div>

      {/* Main Post */}
      <Card className="w-full shadow-none border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={mainPost.user.avatar || "/placeholder.svg"}
                  className="object-cover w-10 h-10"
                  alt={mainPost.user.name}
                />
                <AvatarFallback className="bg-neutral-200 text-neutral-700">
                  {mainPost.user.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-neutral-900">
                  {mainPost.user.name}{" "}
                  <span className="text-sm text-neutral-500">
                    ~ {mainPost.timestamp}
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-black hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0 border-b border-neutral-200 pb-2">
          <p className="text-neutral-800 mb-2 leading-relaxed lg:max-w-2/4">
            {mainPost.content}
          </p>

          {/* Images if present */}
          {mainPost.images.length > 0 && (
            <div className="flex space-x-2">
              {mainPost.images.map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Post image ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-52 h-52 mb-3 rounded-lg object-cover"
                />
              ))}
            </div>
          )}

          {/* Reply button */}
          <div className="flex items-center space-x-2 text-neutral-500">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-neutral-500 hover:text-neutral-700"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{mainPost.repliesCount} Replies</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4 mt-4 ml-10">
        {replies.map((reply) => (
          <Card key={reply.id} className="w-full shadow-none border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={reply.user.avatar || "/placeholder.svg"}
                      className="object-cover w-10 h-10"
                      alt={reply.user.name}
                    />
                    <AvatarFallback className="bg-neutral-200 text-neutral-700">
                      {reply.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {reply.user.name}{" "}
                      <span className="text-sm text-neutral-500">
                        - {reply.timestamp}
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-black hover:text-white"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-neutral-800 mb-2 leading-relaxed lg:max-w-2/4">
                {reply.content}
              </p>

              {/* Images if present */}
              {reply.images.length > 0 && (
                <div className="flex space-x-2">
                  {reply.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Reply image ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-52 h-52 mb-3 rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ReplyThread;
