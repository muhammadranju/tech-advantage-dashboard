/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BackButton from "@/components/logo/BackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAllCommunityPostsCommentsQuery } from "@/lib/redux/features/api/community/communitySliceApi";
import { MessageCircle, MoreHorizontal, Send } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const formatTimestamp = (dateString: string): string => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60)
  );
  let timestamp: string;
  if (diffInMinutes < 60) {
    timestamp = `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    timestamp = `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    timestamp = createdDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return timestamp;
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

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
  repliesCount: 0,
  images: [],
};

interface User {
  name: string;
  avatar?: string;
  initials: string;
}

interface Reply {
  id: string;
  user: User;
  timestamp: string;
  content: string;
  images: string[];
  nestedReplies: Reply[];
}

function ReplyThread() {
  const { replyID } = useParams();

  const { data: commentsData } = useGetAllCommunityPostsCommentsQuery({
    postId: replyID as string,
  });

  console.log(commentsData);

  const mainPostWithCount = {
    ...mainPost,
    repliesCount: commentsData?.data?.length || 0,
  };

  // Map backend comments to replies shape with nested replies
  const replies: Reply[] = (commentsData?.data || []).map(
    (backendComment: any) => ({
      id: backendComment._id,
      user: {
        name: backendComment.user.name,
        avatar: undefined,
        initials: getInitials(backendComment.user.name),
      },
      timestamp: formatTimestamp(backendComment.createdAt),
      content: backendComment.text,
      images: backendComment.image || [],
      nestedReplies: backendComment.replies.map((backendReply: any) => ({
        id: backendReply._id,
        user: {
          name: backendReply.user.name,
          avatar: undefined,
          initials: getInitials(backendReply.user.name),
        },
        timestamp: formatTimestamp(backendReply.createdAt),
        content: backendReply.text,
        images: backendReply.image || [],
      })),
    })
  );

  const getImageSrc = (image: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (image.startsWith("http")) {
      return image;
    }
    return baseUrl ? baseUrl.concat(image) : image;
  };

  const ReplyCard = ({
    reply,
    isNested = false,
  }: {
    reply: Reply;
    isNested?: boolean;
  }) => (
    <Card className="w-full shadow-none border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className={isNested ? "h-8 w-8" : "h-10 w-10"}>
              <AvatarImage
                src={reply.user.avatar || "/placeholder.svg"}
                className={`object-cover ${isNested ? "w-8 h-8" : "w-10 h-10"}`}
                alt={reply.user.name}
              />
              <AvatarFallback className="bg-neutral-200 text-neutral-700">
                {reply.user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p
                className={`font-medium text-neutral-900 ${
                  isNested ? "text-sm" : ""
                }`}
              >
                {reply.user.name}{" "}
                <span
                  className={`text-sm text-neutral-500 ${
                    isNested ? "text-xs" : ""
                  }`}
                >
                  {isNested ? "- " : ""}
                  {reply.timestamp}
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
        <p
          className={`text-neutral-800 mb-2 leading-relaxed ${
            isNested ? "text-sm lg:max-w-3/4" : "lg:max-w-2/4"
          }`}
        >
          {reply.content}
        </p>

        {reply.images?.length > 0 && (
          <div className="flex space-x-2">
            {reply.images.map((image, index) => (
              <Image
                key={index}
                src={getImageSrc(image)}
                alt={`Reply image ${index + 1}`}
                width={400}
                height={400}
                className={`${
                  isNested ? "w-32 h-32" : "w-52 h-52"
                } mb-3 rounded-lg object-cover`}
              />
            ))}
          </div>
        )}

        {reply.nestedReplies?.length > 0 && (
          <div className="ml-10 space-y-4 mt-2">
            {reply.nestedReplies.map((nestedReply) => (
              <ReplyCard
                key={nestedReply.id}
                reply={nestedReply}
                isNested={true}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <BackButton backText="Back to community" />
      <div className="mx-auto px-10">
        {/* Main Post */}
        <Card className="w-full shadow-none border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={mainPostWithCount.user.avatar || "/placeholder.svg"}
                    className="object-cover w-10 h-10"
                    alt={mainPostWithCount.user.name}
                  />
                  <AvatarFallback className="bg-neutral-200 text-neutral-700">
                    {mainPostWithCount.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-neutral-900">
                    {mainPostWithCount.user.name}{" "}
                    <span className="text-sm text-neutral-500">
                      ~ {mainPostWithCount.timestamp}
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
              {mainPostWithCount.content}
            </p>

            {mainPostWithCount.images?.length > 0 && (
              <div className="flex space-x-2">
                {mainPostWithCount.images.map((image, index) => (
                  <Image
                    key={index}
                    src={getImageSrc(image)}
                    alt={`Post image ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-52 h-52 mb-3 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center space-x-2 text-neutral-500">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-neutral-500 hover:text-neutral-700"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {mainPostWithCount.repliesCount} Replies
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4 mt-4 ml-10">
          {replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
          <div className="flex items-center justify-end mt-4 space-x-2 sr-only">
            <Input placeholder="Reply here..." />
            <Button
              variant="default"
              className="h-8 px-6 py-6 text-white hover:bg-neutral-800"
            >
              <Send className="mr-2 h-4 w-4" /> Reply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReplyThread;
