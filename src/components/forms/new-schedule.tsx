"use client";

import type React from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { createScheduleSchema } from "~/schemas/schedules/create";
import type { z } from "zod";

// Get all supported IANA timezones from the environment
const timezonesList = Intl.supportedValuesOf("timeZone");

// Handle edge case: No timezones reported (highly unlikely)
if (timezonesList.length === 0) {
  console.error(
    "No supported timezones found via Intl.supportedValuesOf. Cannot populate timezone selector.",
  );
  // Potentially disable the form or show an error to the user here
  // For now, we'll proceed but the dropdown will be empty.
}

// Sort the list for the dropdown
timezonesList.sort();

// Determine the default timezone
let defaultTimezone: string | undefined = undefined;

if (timezonesList.length > 0) {
  // Start with the first available timezone as a fallback
  defaultTimezone = timezonesList[0];
  try {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Prefer browser's timezone ONLY if it's in the reported list
    if (timezonesList.includes(browserTimezone)) {
      defaultTimezone = browserTimezone;
    }
  } catch (e) {
    console.warn(
      "Could not detect browser timezone, using first available timezone as default.",
      e,
    );
  }
}

const cronPresets = [
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every 15 minutes", value: "*/15 * * * *" },
  { label: "Every 30 minutes", value: "*/30 * * * *" },
  { label: "Every hour (at :00)", value: "0 * * * *" },
  { label: "Every 2 hours", value: "0 */2 * * *" },
  { label: "Daily at midnight (00:00)", value: "0 0 * * *" },
  { label: "Daily at noon (12:00)", value: "0 12 * * *" },
  { label: "Weekly (Mon 9am)", value: "0 9 * * 1" },
  { label: "Monthly (1st day at 6am)", value: "0 6 1 * *" },
];

export function NewScheduleForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof createScheduleSchema>>({
    resolver: zodResolver(createScheduleSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      cron: "",
      url: "",
      type: "POST",
      headers: "",
      body: "",
      timezone: defaultTimezone ?? "",
    },
  });

  const createSchedule = api.schedule.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch data if needed, then redirect
      router.push("/schedules");
      // Optionally, reset the form: form.reset();
    },
    onError: (error) => {
      // Handle specific tRPC errors or show a generic message
      setFormError(error.message ?? "Creation failed. Please try again.");
    },
  });

  // Memoize the preset selection handler to prevent unnecessary re-renders
  const handlePresetSelect = useCallback(
    (preset: string) => {
      form.setValue("cron", preset, {
        shouldValidate: false, // Don't validate immediately
        shouldDirty: true,
      });
    },
    [form],
  );

  async function onSubmit(values: z.infer<typeof createScheduleSchema>) {
    console.log(values);
    setFormError(null);
    try {
      // FIXME: Replace with actual schedule creation logic

      createSchedule.mutate(values);
    } catch (error) {
      console.error(error);
      setFormError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                {formError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My cool schedule" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        A descriptive name for your schedule.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Runs every monday"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Describe what this schedule does.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="cron"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Cron Expression</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              placeholder="* * * * *"
                              {...field}
                              className="flex-grow"
                            />
                          </FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="shrink-0">
                                Load Preset
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {cronPresets.map((preset) => (
                                <DropdownMenuItem
                                  key={preset.value}
                                  onSelect={() =>
                                    handlePresetSelect(preset.value)
                                  }
                                >
                                  {preset.label} ({preset.value})
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <FormMessage />
                        <FormDescription>
                          A{" "}
                          <a
                            href="https://crontab.guru/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            valid cron expression
                          </a>{" "}
                          to schedule the schedule.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Timezone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Select timezone"
                              className="w-full"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {timezonesList.map((tz) => (
                            <SelectItem key={tz} value={tz}>
                              {tz}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <FormDescription>
                        The timezone in which the cron expression will be
                        evaluated.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>HTTP Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Select HTTP method"
                              className="w-full"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <FormDescription>
                        The HTTP method to use for the request.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/webhook"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        The URL to send the HTTP request to.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="headers"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Headers (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='{"x-api-key": "1234567890"}'
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        JSON string of headers to include.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Body (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='{"key": "value"}'
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        JSON string of request body content.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createSchedule.isPending}
                >
                  {createSchedule.isPending ? "Creating..." : "Create schedule"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
