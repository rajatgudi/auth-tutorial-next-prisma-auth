import { ExtendedUser } from "@/next-auth";
import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}
//based on parent component it behaves as client / server
const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-sm max-w-[280px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-sm max-w-[280px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-sm max-w-[480px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-sm max-w-[480px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">isOAuth</p>
          <p className="truncate text-sm max-w-[480px] font-mono p-1 bg-slate-100 rounded-md">
            <Badge>{user?.isOAuth ? "True" : "False"}</Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
