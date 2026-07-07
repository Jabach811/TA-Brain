const allowedDuplicateBareSlugs = [
  {
    slug: "csr",
    ids: ["concepts/csr", "glossary/csr"],
    reason: "Concept/document page plus glossary acronym entry."
  },
  {
    slug: "nsa",
    ids: ["concepts/nsa", "glossary/nsa"],
    reason: "Concept page plus glossary acronym entry."
  },
  {
    slug: "vef",
    ids: ["concepts/vef", "glossary/vef"],
    reason: "Document page plus glossary acronym entry."
  },
  {
    slug: "com",
    ids: ["onboarding/com", "roles/com"],
    reason: "Role reference and onboarding guide intentionally share the role slug."
  },
  {
    slug: "lm-dc",
    ids: ["onboarding/lm-dc", "roles/lm-dc"],
    reason: "Role reference and onboarding guide intentionally share the role slug."
  }
];

function normalizeIds(ids) {
  return [...ids].sort();
}

function sameIds(left, right) {
  const a = normalizeIds(left);
  const b = normalizeIds(right);
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

function classifyDuplicateBareSlugs(duplicateBareSlugs) {
  const allowed = [];
  const unexpected = [];

  duplicateBareSlugs.forEach(item => {
    const rule = allowedDuplicateBareSlugs.find(candidate => candidate.slug === item.slug);
    if (rule && sameIds(rule.ids, item.ids)) {
      allowed.push({ ...item, reason: rule.reason });
    } else {
      unexpected.push(item);
    }
  });

  const staleAllowed = allowedDuplicateBareSlugs.filter(rule => {
    return !duplicateBareSlugs.some(item => item.slug === rule.slug && sameIds(rule.ids, item.ids));
  });

  return { allowed, unexpected, staleAllowed };
}

module.exports = {
  allowedDuplicateBareSlugs,
  classifyDuplicateBareSlugs
};
