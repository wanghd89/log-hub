/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from "react";
import VPCArch from "assets/images/desc/vpcFlowArch.png";
import ExtLink from "components/ExtLink";
import { VPC_FLOW_LOG_LINK } from "assets/js/const";
import { useTranslation } from "react-i18next";
const VPCDesc: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="ingest-desc-title">
        {t("servicelog:create.service.vpc")}
      </div>
      <div className="ingest-desc-desc">
        {t("servicelog:vpc.desc.ingest")}
        <ExtLink to={VPC_FLOW_LOG_LINK}>
          {t("servicelog:vpc.desc.vpcLog")}
        </ExtLink>{" "}
        {t("servicelog:vpc.desc.intoDomain")}
      </div>
      <div>
        <ul>
          <li>{t("servicelog:vpc.desc.good1")}</li>
          <li>{t("servicelog:vpc.desc.good2")}</li>
          <li>{t("servicelog:vpc.desc.good3")}</li>
        </ul>
      </div>
      <div className="ingest-desc-title">
        {t("servicelog:vpc.desc.archName")}
      </div>
      <div className="ingest-desc-desc">
        {t("servicelog:vpc.desc.archDesc")}
      </div>
      <div className="mt-10">
        <img
          className="img-border"
          alt="architecture"
          width="80%"
          src={VPCArch}
        />
      </div>
    </div>
  );
};

export default VPCDesc;
