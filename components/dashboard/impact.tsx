"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface ImpactEntry {
  title: string;
  count: number;
}

export default function ImpactPage() {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [entries, setEntries] = useState<ImpactEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && count.trim()) {
      setEntries([
        ...entries,
        { title: title.trim(), count: Number.parseInt(count) },
      ]);
      setTitle("");
      setCount("");
      setIsOpen(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 text-balance">
            Impact Tracker
          </h1>
          {/* <p className="text-lg text-slate-600 dark:text-slate-400 text-balance">
            Track and measure your impact
          </p> */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add News
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add News Article</DialogTitle>
              </DialogHeader>

              <Card className="p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg mb-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Title Input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-semibold text-slate-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter impact title..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                    />
                  </div>

                  {/* Count Input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="count"
                      className="text-sm font-semibold text-slate-900 dark:text-white"
                    >
                      Count
                    </label>
                    <input
                      id="count"
                      type="number"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      placeholder="Enter count..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                  >
                    Submit
                  </Button>
                </form>
              </Card>
            </DialogContent>
          </Dialog>
        </div>

        {/* Form Card */}

        {/* Entries List */}
        {entries.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Entries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map((entry, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        Title
                      </p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {entry.title}
                      </p>
                    </div>
                    <div className="ml-6 pl-6 border-l-2 border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        Count
                      </p>
                      <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        {entry.count}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
