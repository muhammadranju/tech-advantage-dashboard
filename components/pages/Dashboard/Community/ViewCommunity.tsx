/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackButton from "@/components/logo/BackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetAllCommunityPostsQuery } from "@/lib/redux/features/api/community/communitySliceApi";
import { MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { GrGroup } from "react-icons/gr";

const FeaturedGroupCard = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => (
  <div className="w-fit p-2 rounded-lg shadow-md">
    <Image
      width={500}
      height={250}
      src={
        image.startsWith("http")
          ? image
          : `${process.env.NEXT_PUBLIC_BASE_URL?.concat(image)}`
      }
      alt={name}
      className="w-full h-60 object-cover rounded-xl"
    />
    <div className="mt-2 flex items-center">
      <span className="text-xl mr-1">
        <GrGroup />
      </span>
      <span className="text-base font-semibold">{name}</span>
    </div>
  </div>
);

const PostCard = ({
  post,
  communityID,
}: {
  post: {
    id: string;
    user: {
      name: string;
      avatar?: string;
      initials: string;
    };
    timestamp: string;
    content: string;
    replies: number;
    images: string[];
  };
  communityID: string;
}) => (
  <>
    <Card className="w-full shadow-none border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={post.user.avatar || "/placeholder.svg"}
                className="object-cover w-10 h-10"
                alt={post.user.name}
              />
              <AvatarFallback className="bg-neutral-200 text-neutral-700">
                {post.user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-neutral-900">
                {post.user.name}{" "}
                <span className="text-sm text-neutral-500">
                  ~ {post.timestamp}
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
          {post.content}
        </p>

        {post.images.length > 0 && (
          <div className="flex space-x-2">
            {post.images.map((image, index) => (
              <Image
                key={index}
                src={
                  image.startsWith("http")
                    ? image
                    : `${process.env.NEXT_PUBLIC_BASE_URL?.concat(image)}`
                }
                alt={`Post image ${index + 1}`}
                width={400}
                height={400}
                className="w-52 h-52 mb-3 rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2 text-neutral-500">
          <Link href={`/dashboard/community/${communityID}/${post.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-neutral-500 hover:text-neutral-700"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">See Replies</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </>
);

export default function ViewCommunity() {
  const { community } = useParams();
  const searchParams = useSearchParams();
  const groupTitle = searchParams.get("group-title");
  const groupImage = searchParams.get("image");
  const { data: postData } = useGetAllCommunityPostsQuery({
    groupId: community as string,
  });

  console.log(postData);

  // Map backend data to the expected post shape
  const posts = (postData?.data || []).map((backendPost: any) => {
    const createdDate = new Date(backendPost.createdAt);
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

    const initials = backendPost.user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return {
      id: backendPost._id,
      user: {
        name: backendPost.user.name,
        avatar: undefined, // No avatar in backend; uses placeholder
        initials,
      },
      timestamp,
      content: backendPost.description,
      replies: 0, // Not provided in backend; default to 0
      images: backendPost.image || [],
    };
  });

  // Extract group info from first post (assuming all posts share the same group)
  const group =
    posts.length > 0
      ? postData?.data[0].group
      : {
          name: groupTitle || "",
          image: `${process.env.NEXT_PUBLIC_BASE_URL?.concat(
            "/image/pizza-1757628391545.jpg"
          )}`,
        };

  return (
    <>
      <BackButton backText="Back to Group" />
      <div className="mx-auto px-10">
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            {groupTitle} <small>(Group)</small>
          </h1>
          <FeaturedGroupCard
            name={group.name}
            image={groupImage || group.image}
          />
        </div>

        <div className="space-y-4">
          {posts.map((post: any) => (
            <PostCard
              key={post.id}
              post={post}
              communityID={community as string}
            />
          ))}
        </div>
      </div>
    </>
  );
}
