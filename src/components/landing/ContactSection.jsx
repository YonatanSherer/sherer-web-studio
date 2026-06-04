import React, { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function ContactSection() {
  const { t, isRTL, lang } = useLang();
  const form = t("contactForm");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    full_name: "",
    business_name: "",
    email: "",
    phone: "",
    preferred_contact: "",
    website_type: "",
    budget: "",
    message: "",
  });

  const validate = () => {
    const errs = {};
    if (!data.full_name.trim()) errs.full_name = true;
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) errs.email = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await base44.entities.ContactSubmission.create({ ...data, language: lang });
    base44.analytics.track({ eventName: "contact_form_submit", properties: { language: lang } });
    setSubmitted(true);
    setLoading(false);
  };

  const update = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <section id="contact" dir={isRTL ? "rtl" : "ltr"} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("contactTitle")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t("contactSubtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact buttons */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "contact" } })}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">WhatsApp</p>
                <p className="text-xs text-muted-foreground">{SITE_CONFIG.phone}</p>
              </div>
            </a>

            <a
              href={SITE_CONFIG.line}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "line_click", properties: { location: "contact" } })}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#00B900]/30 bg-[#00B900]/5 hover:bg-[#00B900]/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00B900]/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#00B900]" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">LINE</p>
                <p className="text-xs text-muted-foreground">@yonatanwebstudio</p>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00b4ff]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#00b4ff]" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Email</p>
                <p className="text-xs text-muted-foreground">{SITE_CONFIG.email}</p>
              </div>
            </a>
          </div>

          {/* Contact form */}
          <Card className="lg:col-span-3 border-border/50">
            <CardContent className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-14 h-14 text-[#00b4ff] mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground">{form.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1.5 block">{form.fullName} *</Label>
                      <Input
                        value={data.full_name}
                        onChange={(e) => update("full_name", e.target.value)}
                        className={errors.full_name ? "border-destructive" : ""}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">{form.businessName}</Label>
                      <Input
                        value={data.business_name}
                        onChange={(e) => update("business_name", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1.5 block">{form.email} *</Label>
                      <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">{form.phone}</Label>
                      <Input
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1.5 block">{form.preferredContact}</Label>
                      <Select value={data.preferred_contact} onValueChange={(v) => update("preferred_contact", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {form.contactMethods.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">{form.websiteType}</Label>
                      <Select value={data.website_type} onValueChange={(v) => update("website_type", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {form.websiteTypes.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm mb-1.5 block">{form.budget}</Label>
                    <Select value={data.budget} onValueChange={(v) => update("budget", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {form.budgets.map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-1.5 block">{form.message}</Label>
                    <Textarea
                      value={data.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-[#00b4ff] hover:bg-[#0090cc] text-white font-semibold rounded-xl"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 me-2" />
                        {form.submit}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}