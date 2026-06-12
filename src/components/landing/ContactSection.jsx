import React, { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { usePricing } from "@/lib/usePricing";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LINEIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

export default function ContactSection() {
  const { t, isRTL, lang } = useLang();
  const form = t("contactForm");
  const { budgetOptions } = usePricing(lang);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    full_name: "", business_name: "", email: "", phone: "",
    preferred_contact: "", website_type: "", budget: "", preferred_lang: lang, message: "",
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
    <section
      id="contact"
      dir={isRTL ? "rtl" : "ltr"}
      className="py-14 md:py-20 bg-muted/20"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-10 ${isRTL ? "text-right" : "text-center"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("contactTitle")}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("contactSubtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-7 max-w-5xl mx-auto">
          {/* Contact options */}
          <div className="lg:col-span-2 space-y-3">
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "contact" } })}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#25D366]/25 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              aria-label={t("floatWhatsApp")}
            >
              <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <span className="text-white"><WhatsAppIcon /></span>
              </div>
              <div className={isRTL ? "text-right" : ""}>
                <p className="font-semibold text-foreground text-sm">WhatsApp</p>
                <p className="text-xs text-muted-foreground">{SITE_CONFIG.phone}</p>
              </div>
            </a>

            <a
              href={SITE_CONFIG.line}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "line_click", properties: { location: "contact" } })}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#06C755]/25 bg-[#06C755]/5 hover:bg-[#06C755]/10 transition-colors"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              aria-label={t("floatLINE")}
            >
              <div className="w-10 h-10 rounded-lg bg-[#06C755] flex items-center justify-center flex-shrink-0">
                <span className="text-white"><LINEIcon /></span>
              </div>
              <div className={isRTL ? "text-right" : ""}>
                <p className="font-semibold text-foreground text-sm">LINE</p>
                <p className="text-xs text-muted-foreground">@yonatanwebstudio</p>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#00b4ff]/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#00b4ff]" />
              </div>
              <div className={isRTL ? "text-right" : ""}>
                <p className="font-semibold text-foreground text-sm">Email</p>
                <p className="text-xs text-muted-foreground break-all">{SITE_CONFIG.email}</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <Card className="lg:col-span-3 border-border/50 shadow-sm">
            <CardContent className="p-5 md:p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-14 h-14 text-[#00b4ff] mx-auto mb-4" />
                  <p className="text-base font-semibold text-foreground">{form.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <Label className="text-xs font-medium mb-1.5 block">
                        {form.fullName} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={data.full_name}
                        onChange={(e) => update("full_name", e.target.value)}
                        placeholder={form.fullNamePlaceholder}
                        className={`h-9 text-sm ${errors.full_name ? "border-destructive" : ""}`}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-1.5 block">{form.businessName}</Label>
                      <Input
                        value={data.business_name}
                        onChange={(e) => update("business_name", e.target.value)}
                        placeholder={form.businessNamePlaceholder}
                        className="h-9 text-sm"
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <Label className="text-xs font-medium mb-1.5 block">
                        {form.email} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder={form.emailPlaceholder}
                        className={`h-9 text-sm ${errors.email ? "border-destructive" : ""}`}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-1.5 block">{form.phone}</Label>
                      <Input
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder={form.phonePlaceholder}
                        className="h-9 text-sm"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <Label className="text-xs font-medium mb-1.5 block">{form.preferredContact}</Label>
                      <Select value={data.preferred_contact} onValueChange={(v) => update("preferred_contact", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {form.contactMethods.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-1.5 block">{form.websiteType}</Label>
                      <Select value={data.website_type} onValueChange={(v) => update("website_type", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {form.websiteTypes.map((wt) => <SelectItem key={wt} value={wt}>{wt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">{form.budget}</Label>
                    <Select value={data.budget} onValueChange={(v) => update("budget", v)}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">{form.message}</Label>
                    <Textarea
                      value={data.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={form.messagePlaceholder}
                      rows={3}
                      className="text-sm resize-none"
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>

                  {(errors.full_name || errors.email) && (
                    <p className="text-xs text-destructive">{form.errorRequired}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 bg-[#00b4ff] hover:bg-[#0099dd] text-white font-semibold rounded-xl text-sm"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 me-2" />
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